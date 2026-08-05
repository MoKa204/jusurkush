import fs from "fs/promises";
import path from "path";

export interface StorageProvider {
  uploadFile(file: File, folder?: string): Promise<string>;
}

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public", "uploads");
  }

  async uploadFile(file: File, folder = "products"): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const targetFolder = path.join(this.uploadDir, folder);
    await fs.mkdir(targetFolder, { recursive: true });

    const fileExt = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExt}`;
    const filePath = path.join(targetFolder, filename);

    await fs.writeFile(filePath, buffer);
    return `/uploads/${folder}/${filename}`;
  }
}

export class S3StorageProviderStub implements StorageProvider {
  async uploadFile(file: File, folder = "products"): Promise<string> {
    console.log(`[S3 Stub] Simulating S3 upload for ${file.name} to folder ${folder}`);
    // In production with AWS SDK: return `https://${bucket}.s3.amazonaws.com/${folder}/${filename}`;
    return `/uploads/${folder}/s3-stub-${Date.now()}-${file.name}`;
  }
}

export function getStorageProvider(): StorageProvider {
  const driver = process.env.STORAGE_DRIVER || "local";
  if (driver === "s3") {
    return new S3StorageProviderStub();
  }
  return new LocalStorageProvider();
}
