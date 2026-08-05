import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding category taxonomy (NO fake products/users)...");

  const categories = [
    {
      name: "Electronics & Gadgets",
      slug: "electronics",
      description: "Smartphones, laptops, accessories, and consumer electronics",
      icon: "Smartphone",
    },
    {
      name: "Fashion & Apparel",
      slug: "fashion",
      description: "Clothing, shoes, bags, and fashion accessories",
      icon: "Shirt",
    },
    {
      name: "Home & Living",
      slug: "home-living",
      description: "Furniture, home decor, kitchenware, and appliances",
      icon: "Home",
    },
    {
      name: "Health & Beauty",
      slug: "health-beauty",
      description: "Skincare, cosmetics, personal care, and wellness products",
      icon: "Sparkles",
    },
    {
      name: "Sports & Outdoor",
      slug: "sports-outdoor",
      description: "Fitness gear, outdoor equipment, and sportswear",
      icon: "Dumbbell",
    },
    {
      name: "Books & Stationery",
      slug: "books-stationery",
      description: "Books, notebooks, pens, and office supplies",
      icon: "BookOpen",
    },
    {
      name: "Toys, Kids & Baby",
      slug: "toys-kids-baby",
      description: "Toys, baby gear, clothing, and learning items",
      icon: "Baby",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("Categories seeded successfully. Zero products/users created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
