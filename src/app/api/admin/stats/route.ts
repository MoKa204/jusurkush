import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const [
      totalUsers,
      totalSellers,
      pendingSellers,
      totalProducts,
      totalOrders,
      grossRevenueAggregate,
      pendingLoans,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.sellerProfile.count(),
      prisma.sellerProfile.count({ where: { status: "PENDING" } }),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.loanApplication.count({ where: { status: "PENDING" } }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalSellers,
        pendingSellers,
        totalProducts,
        totalOrders,
        totalRevenue: grossRevenueAggregate._sum.totalAmount || 0,
        pendingLoans,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({
      stats: {
        totalUsers: 0,
        totalSellers: 0,
        pendingSellers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingLoans: 0,
      },
    });
  }
}
