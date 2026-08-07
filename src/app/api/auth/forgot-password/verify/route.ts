import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifyCodeSchema = z.object({
  identifier: z.string().min(3, "Identifier required"),
  code: z.string().length(6, "Verification code must be 6 digits"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = verifyCodeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { identifier, code } = parsed.data;
    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanIdentifier },
          { phone: identifier.trim() },
          { phone: { contains: identifier.trim() } },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User account not found" }, { status: 404 });
    }

    // Check code match
    if (!user.resetCode || user.resetCode !== code.trim()) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    // Check code expiration
    if (!user.resetCodeExpires || new Date() > new Date(user.resetCodeExpires)) {
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code validated successfully",
      email: user.email,
    });
  } catch (error: any) {
    console.error("Verify reset code error:", error);
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }
}
