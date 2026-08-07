import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

const resetPasswordSchema = z.object({
  identifier: z.string().min(3, "Identifier required"),
  code: z.string().length(6, "Verification code must be 6 digits"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { identifier, code, newPassword } = parsed.data;
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
      return NextResponse.json({ error: "Verification code has expired. Please request a new code." }, { status: 400 });
    }

    // Hash new password and clear reset code
    const passwordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetCode: null,
        resetCodeExpires: null,
      },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
