import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const createProductSchema = z.object({
  name: z.string().min(2, "Product name required"),
  category: z.string().min(1, "Category is required"),
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
    if (user.sellerProfile.status !== "APPROVED") {
      return NextResponse.json(
        {
          error: "Your seller account is currently under review by Admin. You cannot publish products until your account is approved.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Map categoryId or category to category
    const normalizedBody = {
      ...body,
      category: (body.category || body.categoryId || "").toString().trim(),
      price: typeof body.price === "string" ? parseFloat(body.price) : body.price,
      stock: typeof body.stock === "string" ? parseInt(body.stock, 10) : body.stock,
    };

    const parsed = createProductSchema.safeParse(normalizedBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, category: rawCategory, description, price, stock, images } = parsed.data;

    // Find or create Category dynamically from seller short answer input
    const categoryName = rawCategory.trim();
    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `cat-${Date.now()}`;

    let categoryObj = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { equals: categoryName } },
          { slug: categorySlug },
        ],
      },
    });

    if (!categoryObj) {
      categoryObj = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categorySlug,
        },
      });
    }

    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        sellerId: user.sellerProfile.id,
        categoryId: categoryObj.id,
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
