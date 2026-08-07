import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 });
    }

    const { id } = params; // Commission Payment ID
    const body = await req.json();
    const { status } = body; // VERIFIED, REJECTED

    const payment = await prisma.commissionPayment.findUnique({
      where: { id },
      include: { seller: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    const updatedPayment = await prisma.commissionPayment.update({
      where: { id },
      data: {
        status: status || "VERIFIED",
        verifiedAt: new Date(),
      },
    });

    if (status === "VERIFIED") {
      // Clear seller overdue balance & auto-reactivate seller status to APPROVED
      await prisma.sellerProfile.update({
        where: { id: payment.sellerId },
        data: {
          unpaidCommission: 0,
          commissionOverdueSince: null,
          isSuspendedForFee: false,
          status: "APPROVED",
        },
      });
    }

    return NextResponse.json({ payment: updatedPayment, success: true });
  } catch (error) {
    console.error("Admin commission verification error:", error);
    return NextResponse.json({ error: "Failed to update commission payment status" }, { status: 500 });
  }
}
