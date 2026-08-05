import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: {
          select: {
            id: true,
            businessName: true,
            businessAddress: true,
            contactInfo: true,
            createdAt: true,
          },
        },
        category: true,
        reviews: {
          include: {
            buyer: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let parsedImages = [];
    try {
      parsedImages = JSON.parse(product.images);
    } catch (e) {
      parsedImages = [product.images];
    }

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0;

    return NextResponse.json({
      product: {
        ...product,
        images: parsedImages,
        avgRating,
        reviewCount: product.reviews.length,
      },
    });
  } catch (error) {
    console.error("Fetch product detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
