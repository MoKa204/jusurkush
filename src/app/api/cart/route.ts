import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

async function getOrCreateCartId(userId?: string) {
  const cookieStore = cookies();
  let sessionToken = cookieStore.get("cart_session")?.value;

  if (!sessionToken && !userId) {
    sessionToken = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    cookieStore.set("cart_session", sessionToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  }

  if (userId) {
    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    return cart.id;
  }

  let cart = await prisma.cart.findUnique({ where: { sessionToken } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionToken } });
  }
  return cart.id;
}

export async function GET() {
  try {
    const user = await getSessionUser();
    const cartId = await getOrCreateCartId(user?.id);

    const items = await prisma.cartItem.findMany({
      where: { cartId },
      include: {
        product: {
          include: {
            seller: {
              select: {
                id: true,
                businessName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedItems = items.map((item) => {
      let parsedImages = [];
      try {
        parsedImages = JSON.parse(item.product.images);
      } catch (e) {
        parsedImages = [item.product.images];
      }
      return {
        ...item,
        product: {
          ...item.product,
          images: parsedImages,
        },
      };
    });

    return NextResponse.json({ items: formattedItems });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { productId, quantity = 1 } = await req.json();
    const user = await getSessionUser();
    const cartId = await getOrCreateCartId(user?.id);

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { cartItemId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart PATCH error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("cartItemId");
    const clearAll = searchParams.get("all");
    const user = await getSessionUser();
    const cartId = await getOrCreateCartId(user?.id);

    if (clearAll === "true") {
      await prisma.cartItem.deleteMany({ where: { cartId } });
    } else if (cartItemId) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}
