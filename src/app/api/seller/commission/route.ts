import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const payCommissionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  paymentProof: z.string().min(1, "Payment proof image URL is required"),
});

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    const seller = await prisma.sellerProfile.findUnique({
      where: { id: user.sellerProfile.id },
      include: {
        commissionPayments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!seller) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const now = new Date();
    const createdAt = new Date(seller.createdAt);
    const daysOld = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const isFreeTrial = daysOld <= 60;
    const trialDaysRemaining = isFreeTrial ? Math.max(0, 60 - daysOld) : 0;

    let overdueDays = 0;
    if (seller.commissionOverdueSince && seller.unpaidCommission > 0) {
      const overdueStart = new Date(seller.commissionOverdueSince);
      overdueDays = Math.floor((now.getTime() - overdueStart.getTime()) / (1000 * 60 * 60 * 24));
    }

    const graceDaysRemaining = Math.max(0, 7 - overdueDays);

    const platformBankAccount = {
      bankName: "Bank of Khartoum / Al Rajhi Bank",
      accountHolder: "JusurKush Platform Commission Account",
      accountNumber: "1002-9999-7777",
      iban: "SD991002999977770000",
    };

    return NextResponse.json({
      sellerId: seller.id,
      businessName: seller.businessName,
      status: seller.status,
      isFreeTrial,
      daysOld,
      trialDaysRemaining,
      commissionRate: seller.commissionRate,
      unpaidCommission: seller.unpaidCommission,
      isSuspendedForFee: seller.isSuspendedForFee,
      commissionOverdueSince: seller.commissionOverdueSince,
      overdueDays,
      graceDaysRemaining,
      platformBankAccount,
      payments: seller.commissionPayments,
    });
  } catch (error) {
    console.error("Fetch seller commission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = payCommissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { amount, paymentProof } = parsed.data;

    const payment = await prisma.commissionPayment.create({
      data: {
        sellerId: user.sellerProfile.id,
        amount,
        paymentProof,
        status: "PENDING",
      },
    });

    return NextResponse.json({ payment, success: true });
  } catch (error) {
    console.error("Submit commission payment error:", error);
    return NextResponse.json({ error: "Failed to submit payment proof" }, { status: 500 });
  }
}
