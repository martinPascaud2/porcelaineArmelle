const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { articlesPerPage } from "@/assets/globals";

export default async function getPageMax(articleType) {
  let articlesNumber;
  console.log("getPageMax articleType", articleType);
  try {
    articlesNumber = await prisma.article.count({
      where: { type: articleType },
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }

  console.log("articlesNumber", articlesNumber);

  const pageMax = Math.ceil(articlesNumber / articlesPerPage);

  return pageMax;
}
