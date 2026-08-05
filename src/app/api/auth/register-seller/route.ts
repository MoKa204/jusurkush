import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, setSessionCookie } from "@/lib/auth";

const registerSellerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  businessName: z.string().min(2, "Business name is required"),
  registrationNumber: z.string().min(3, "Business registration number is required"),
  businessAddress: z.string().min(5, "Business address is required"),
  contactInfo: z.string().min(5, "Contact info is required"),
  bankName: z.string().optional(),
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIBAN: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSellerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      businessName,
      registrationNumber,
      businessAddress,
      contactInfo,
      bankName,
      bankAccountName,
      bankAccountNumber,
      bankIBAN,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const existingReg = await prisma.sellerProfile.findUnique({
      where: { registrationNumber },
    });

    if (existingReg) {
      return NextResponse.json({ error: "Business registration number already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: "SELLER",
        sellerProfile: {
          create: {
            businessName,
            registrationNumber,
            businessAddress,
            contactInfo,
            bankName: bankName || "Bank of Khartoum / Al Rajhi",
            bankAccountName: bankAccountName || `${businessName} Account`,
            bankAccountNumber: bankAccountNumber || "1002-3849-5882",
            bankIBAN: bankIBAN || null,
            status: "PENDING",
          },
        },
      },
      include: {
        sellerProfile: true,
      },
    });

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      sellerId: user.sellerProfile?.id,
      sellerStatus: user.sellerProfile?.status,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        sellerProfile: user.sellerProfile,
      },
    });
  } catch (error) {
    console.error("Register seller error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
