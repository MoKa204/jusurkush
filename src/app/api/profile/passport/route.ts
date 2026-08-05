import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { passportPhoto } = await req.json();

    if (!passportPhoto) {
      return NextResponse.json({ error: "Passport photo URL is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        passportPhoto,
        verificationStatus: "PENDING",
      },
    });

    if (user.sellerProfile) {
      await prisma.sellerProfile.update({
        where: { id: user.sellerProfile.id },
        data: {
          passportPhoto,
        },
      });
    }

    return NextResponse.json({
      success: true,
      verificationStatus: updatedUser.verificationStatus,
      passportPhoto: updatedUser.passportPhoto,
    });
  } catch (error) {
    console.error("Passport upload error:", error);
    return NextResponse.json({ error: "Failed to upload passport" }, { status: 500 });
  }
}
