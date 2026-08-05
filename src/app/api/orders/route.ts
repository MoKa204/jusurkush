import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z.string().min(5, "Phone number required"),
  street: z.string().min(3, "Street address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  postalCode: z.string().optional(),
  country: z.string().min(2, "Country required"),
  paymentMethod: z.string().default("bank_transfer"),
  paymentProof: z.string().min(1, "Photo of bank transfer payment proof is required"),
});

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required to checkout" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { paymentProof, paymentMethod, ...shippingDetails } = parsed.data;

    // Fetch user cart
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: { seller: true },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    // Verify stock availability
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Stock limit reached for "${item.product.name}". Only ${item.product.stock} available.`,
          },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Update user's profile location if missing
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phone: user.phone || shippingDetails.phone,
        street: user.street || shippingDetails.street,
        city: user.city || shippingDetails.city,
        state: user.state || shippingDetails.state,
        country: user.country || shippingDetails.country,
      },
    });

    // Execute order creation transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create Order with Payment Transfer Proof
      const newOrder = await tx.order.create({
        data: {
          buyerId: user.id,
          totalAmount,
          status: "PROOF_SUBMITTED", // Seller will verify the attached receipt
          shippingAddress: JSON.stringify(shippingDetails),
          paymentMethod,
          paymentProof,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              sellerId: item.product.sellerId,
              price: item.product.price,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // 2. Decrement Product Stock
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // 3. Clear Cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return NextResponse.json({
      orderId: order.id,
      success: true,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: user.id },
      include: {
        items: {
          include: {
            product: true,
            seller: {
              select: {
                id: true,
                businessName: true,
                bankName: true,
                bankAccountName: true,
                bankAccountNumber: true,
                bankIBAN: true,
              },
            },
            review: true,
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
    console.error("Fetch orders error:", error);
    return NextResponse.json({ orders: [] });
  }
}
