import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { sellerId: user.sellerProfile.id },
      include: {
        order: {
          include: {
            buyer: {
              select: { name: true, email: true },
            },
          },
        },
        product: true,
      },
      orderBy: { id: "desc" },
    });

    const formatted = orderItems.map((item) => ({
      ...item,
      order: {
        ...item.order,
        shippingAddress: JSON.parse(item.order.shippingAddress),
      },
    }));

    return NextResponse.json({ orderItems: formatted });
  } catch (error) {
    console.error("Fetch seller orders error:", error);
    return NextResponse.json({ orderItems: [] });
  }
}
