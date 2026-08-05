import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const pendingUsers = await prisma.user.findMany({
      where: {
        passportPhoto: { not: null },
      },
      include: {
        sellerProfile: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ users: pendingUsers });
  } catch (error) {
    console.error("Fetch passports error:", error);
    return NextResponse.json({ users: [] });
  }
}
