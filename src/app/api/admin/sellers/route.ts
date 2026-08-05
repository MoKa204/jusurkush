import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const sellers = await prisma.sellerProfile.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
        _count: {
          select: { products: true, orderItems: true, loanApplications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sellers });
  } catch (error) {
    console.error("Admin fetch sellers error:", error);
    return NextResponse.json({ sellers: [] });
  }
}
