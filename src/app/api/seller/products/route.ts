import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const createProductSchema = z.object({
  name: z.string().min(2, "Product name required"),
  categoryId: z.string().min(1, "Category selection required"),
  description: z.string().min(5, "Description required"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  images: z.array(z.string()).min(1, "At least one product image is required"),
});

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      where: { sellerId: user.sellerProfile.id },
      include: {
        category: true,
        _count: {
          select: { reviews: true, orderItems: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = products.map((p) => {
      let parsedImages = [];
      try {
        parsedImages = JSON.parse(p.images);
      } catch (e) {
        parsedImages = [p.images];
      }
      return {
        ...p,
        images: parsedImages,
      };
    });

    return NextResponse.json({ products: formatted });
  } catch (error) {
    console.error("Fetch seller products error:", error);
    return NextResponse.json({ products: [] });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Seller authorization required" }, { status: 403 });
    }

    // Authorization check: Must be APPROVED to publish live
    if (user.sellerProfile.status === "SUSPENDED") {
      return NextResponse.json(
        {
          error: "Your seller account is temporarily suspended due to overdue platform commission payments. Please pay the balance to resume publishing.",
        },
        { status: 403 }
      );
    }

    if (user.sellerProfile.status === "REJECTED") {
      return NextResponse.json(
        {
          error: "Your seller registration has been rejected by administration.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, categoryId, description, price, stock, images } = parsed.data;

    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        sellerId: user.sellerProfile.id,
        categoryId,
        name,
        slug,
        description,
        price,
        stock,
        images: JSON.stringify(images),
      },
    });

    return NextResponse.json({ product, success: true });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
