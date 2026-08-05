import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const loanApplicationSchema = z.object({
  requestedAmount: z.number().positive("Loan amount must be positive"),
  businessRevenue: z.number().min(0, "Revenue cannot be negative"),
  revenuePeriod: z.string().min(2, "Revenue period required (e.g. Monthly, Annual)"),
  loanPurpose: z.string().min(5, "Loan purpose required"),
  supportingDocs: z.array(z.string()).min(1, "At least one supporting document required"),
});

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    const applications = await prisma.loanApplication.findMany({
      where: { sellerId: user.sellerProfile.id },
      include: {
        reviewedBy: {
          select: { name: true, email: true },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    const formatted = applications.map((app) => {
      let parsedDocs = [];
      try {
        parsedDocs = JSON.parse(app.supportingDocs);
      } catch (e) {
        parsedDocs = [app.supportingDocs];
      }
      return {
        ...app,
        supportingDocs: parsedDocs,
      };
    });

    return NextResponse.json({ applications: formatted });
  } catch (error) {
    console.error("Fetch seller loans error:", error);
    return NextResponse.json({ applications: [] });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = loanApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { requestedAmount, businessRevenue, revenuePeriod, loanPurpose, supportingDocs } = parsed.data;

    // Strict Spec Requirement: Default new applications to PENDING for manual/admin review.
    // NO auto-approval logic that fabricates a decision.
    const application = await prisma.loanApplication.create({
      data: {
        sellerId: user.sellerProfile.id,
        requestedAmount,
        businessRevenue,
        revenuePeriod,
        loanPurpose,
        supportingDocs: JSON.stringify(supportingDocs),
        status: "PENDING",
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({ application, success: true });
  } catch (error) {
    console.error("Submit loan error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
