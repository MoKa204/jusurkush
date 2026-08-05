import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const deliveryUpdateSchema = z.object({
  status: z.enum(["DISPATCHED", "DELIVERED"]),
  deliveryProofPhoto: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "DELIVERY_OFFICER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Forbidden: Delivery Officer access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = deliveryUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid delivery update parameters" }, { status: 400 });
    }

    const { status, deliveryProofPhoto } = parsed.data;

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        status,
        deliveryProofPhoto: deliveryProofPhoto || undefined,
        deliveryOfficerId: user.id,
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Delivery status update error:", error);
    return NextResponse.json({ error: "Failed to update delivery status" }, { status: 500 });
  }
}
