import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // Demo Delivery Officer
  const deliveryOfficer = await prisma.user.upsert({
    where: { email: "delivery@jusurkush.com" },
    update: {
      role: "DELIVERY_OFFICER",
      phone: "+249 912 345 678",
    },
    create: {
      email: "delivery@jusurkush.com",
      name: "أحمد السوداني (مندوب التوصيل)",
      passwordHash,
      role: "DELIVERY_OFFICER",
      phone: "+249 912 345 678",
      verificationStatus: "VERIFIED",
    },
  });

  // Demo Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@jusurkush.com" },
    update: {
      role: "ADMIN",
    },
    create: {
      email: "admin@jusurkush.com",
      name: "مدير النظام (Executive Admin)",
      passwordHash,
      role: "ADMIN",
      verificationStatus: "VERIFIED",
    },
  });

  console.log("Seeding complete: Created Delivery Officer & Admin accounts.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
