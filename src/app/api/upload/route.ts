import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getStorageProvider } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Restrict product catalog asset uploads to sellers/admins,
    // while allowing passport KYC photos and payment proofs for buyers & registrants
    if (folder === "products" && (!user || (user.role !== "SELLER" && user.role !== "ADMIN"))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const storage = getStorageProvider();
    const url = await storage.uploadFile(file, folder);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
