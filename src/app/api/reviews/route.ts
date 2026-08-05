import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const reviewSchema = z.object({
  orderItemId: z.string().min(1, "Order item required"),
  productId: z.string().min(1, "Product required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(3, "Comment must be at least 3 characters"),
});

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const { orderItemId, productId, rating, comment } = parsed.data;

    // Verify buyer owns the order containing this item
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.buyerId !== user.id) {
      return NextResponse.json(
        { error: "Review prohibited: No verified purchase found for this item." },
        { status: 403 }
      );
    }

    // Check existing review
    const existingReview = await prisma.review.findUnique({
      where: { orderItemId },
    });

    if (existingReview) {
      return NextResponse.json({ error: "Review already submitted for this item" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        orderItemId,
        productId,
        buyerId: user.id,
        rating,
        comment,
      },
    });

    return NextResponse.json({ review, success: true });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
