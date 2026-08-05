import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const reviewLoanSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  reviewerNotes: z.string().min(2, "Reviewer notes required for audit log"),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = reviewLoanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status, reviewerNotes } = parsed.data;

    const updatedLoan = await prisma.loanApplication.update({
      where: { id: params.id },
      data: {
        status,
        reviewerNotes,
        reviewedAt: new Date(),
        reviewedById: user.id,
      },
      include: {
        seller: true,
      },
    });

    return NextResponse.json({ loan: updatedLoan, success: true });
  } catch (error) {
    console.error("Review loan application error:", error);
    return NextResponse.json({ error: "Failed to update loan application" }, { status: 500 });
  }
}
