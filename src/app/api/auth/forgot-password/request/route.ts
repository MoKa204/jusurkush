import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const requestResetSchema = z.object({
  identifier: z.string().min(3, "Email or Phone is required"),
  method: z.enum(["email", "phone"]).default("email"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = requestResetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { identifier, method } = parsed.data;
    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where:
        method === "email"
          ? { email: cleanIdentifier }
          : { OR: [{ phone: identifier.trim() }, { phone: { contains: identifier.trim() } }] },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No registered user account found matching this Email or Phone number" },
        { status: 404 }
      );
    }

    // Generate 6-digit random code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode,
        resetCodeExpires,
      },
    });

    console.log(`[Forgot Password] Reset code generated for ${user.email}: ${resetCode}`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent via ${method}`,
      demoCode: resetCode, // Returned for convenient testing
      email: user.email,
    });
  } catch (error: any) {
    console.error("Request reset code error:", error);
    return NextResponse.json({ error: "Failed to generate verification code" }, { status: 500 });
  }
}
