import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const updateProductSchema = z.object({
  name: z.string().min(2, "Product name required"),
  category: z.string().min(1, "Category required"),
  description: z.string().min(5, "Description required"),
  price: z.number().positive("Price must be > 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  images: z.array(z.string()).min(1, "At least one image required"),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!product || product.sellerId !== user.sellerProfile.id) {
      return NextResponse.json({ error: "Product not found or access denied" }, { status: 404 });
    }

    let parsedImages = [];
    try {
      parsedImages = JSON.parse(product.images);
    } catch (e) {
      parsedImages = [product.images];
    }

    return NextResponse.json({
      product: {
        ...product,
        images: parsedImages,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct || existingProduct.sellerId !== user.sellerProfile.id) {
      return NextResponse.json({ error: "Access denied: product ownership mismatch" }, { status: 403 });
    }

    const body = await req.json();

    const normalizedBody = {
      ...body,
      category: (body.category || body.categoryId || "").toString().trim(),
      price: typeof body.price === "string" ? parseFloat(body.price) : body.price,
      stock: typeof body.stock === "string" ? parseInt(body.stock, 10) : body.stock,
    };

    const parsed = updateProductSchema.safeParse(normalizedBody);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, category: rawCategory, description, price, stock, images } = parsed.data;

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

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        categoryId: categoryObj.id,
        description,
        price,
        stock,
        images: JSON.stringify(images),
      },
    });

    return NextResponse.json({ product: updated, success: true });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "SELLER" || !user.sellerProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct || existingProduct.sellerId !== user.sellerProfile.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
