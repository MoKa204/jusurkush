import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const actionSchema = z.object({
  status: z.enum(["VERIFIED", "REJECTED"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = actionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid action status" }, { status: 400 });
    }

    const { status } = parsed.data;

    const targetUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        verificationStatus: status,
      },
    });

    return NextResponse.json({ success: true, user: targetUser });
  } catch (error) {
    console.error("Passport review error:", error);
    return NextResponse.json({ error: "Failed to update passport verification status" }, { status: 500 });
  }
}
