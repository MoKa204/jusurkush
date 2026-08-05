import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const returnSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  reason: z.string().min(1, "Return reason selection is required"),
  customComplaint: z.string().optional(),
  returnPhotos: z.array(z.string()).optional(),
  returnVideo: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = returnSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { orderId, reason, customComplaint, returnPhotos = [], returnVideo } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.buyerId !== user.id) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 1. Strict Eligibility check: Cannot return before delivery!
    if (order.status !== "DELIVERED") {
      return NextResponse.json(
        { error: "Cannot request a return before the order has been delivered." },
        { status: 400 }
      );
    }

    // 2. Proof requirement check: Must upload a Video OR at least 6 Photos!
    if (!returnVideo && returnPhotos.length < 6) {
      return NextResponse.json(
        {
          error: "To request a product return, you must upload a video OR at least 6 clear photos of the product.",
        },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        returnStatus: "REQUESTED",
        returnReason: reason,
        returnComplaint: customComplaint || null,
        returnPhotos: JSON.stringify(returnPhotos),
        returnVideo: returnVideo || null,
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Return request error:", error);
    return NextResponse.json({ error: "Failed to submit return request" }, { status: 500 });
  }
}
