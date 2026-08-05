import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "DELIVERY_OFFICER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Forbidden: Delivery Officer access required" }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: true,
            seller: {
              select: {
                id: true,
                businessName: true,
                contactInfo: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedOrders = orders.map((o) => ({
      ...o,
      shippingAddress: JSON.parse(o.shippingAddress),
    }));

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error("Fetch delivery orders error:", error);
    return NextResponse.json({ orders: [] });
  }
}
