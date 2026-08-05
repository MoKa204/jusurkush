import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const updateSellerStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateSellerStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const { status } = parsed.data;

    const updatedSeller = await prisma.sellerProfile.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ seller: updatedSeller, success: true });
  } catch (error) {
    console.error("Update seller status error:", error);
    return NextResponse.json({ error: "Failed to update seller status" }, { status: 500 });
  }
}
