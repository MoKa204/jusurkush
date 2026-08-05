import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const loans = await prisma.loanApplication.findMany({
      include: {
        seller: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        reviewedBy: {
          select: { name: true, email: true },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    const formatted = loans.map((l) => {
      let parsedDocs = [];
      try {
        parsedDocs = JSON.parse(l.supportingDocs);
      } catch (e) {
        parsedDocs = [l.supportingDocs];
      }
      return {
        ...l,
        supportingDocs: parsedDocs,
      };
    });

    return NextResponse.json({ loans: formatted });
  } catch (error) {
    console.error("Admin fetch loans error:", error);
    return NextResponse.json({ loans: [] });
  }
}
