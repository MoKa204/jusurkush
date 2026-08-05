import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const query = searchParams.get("q");
    const sort = searchParams.get("sort") || "newest";

    const whereClause: any = {
      seller: {
        status: "APPROVED",
      },
    };

    if (categorySlug) {
      whereClause.category = {
        slug: categorySlug,
      };
    }

    if (query) {
      whereClause.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price-desc") {
      orderBy = { price: "desc" };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        seller: {
          select: {
            id: true,
            businessName: true,
            status: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy,
    });

    const formattedProducts = products.map((p) => {
      const avgRating =
        p.reviews.length > 0
          ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length
          : 0;
      let parsedImages = [];
      try {
        parsedImages = JSON.parse(p.images);
      } catch (e) {
        parsedImages = [p.images];
      }

      return {
        ...p,
        images: parsedImages,
        avgRating,
        reviewCount: p.reviews.length,
      };
    });

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ products: [] });
  }
}
