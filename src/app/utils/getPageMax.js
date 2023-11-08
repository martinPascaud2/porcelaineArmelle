const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { articlesPerPage } from "@/assets/globals";

export default async function getPageMax(articleType) {
  let articlesNumber;
  try {
    articlesNumber = await prisma.article.count({
      where: { type: articleType },
    });
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Page max counting failed : " + error);
  }

  const pageMax = Math.ceil(articlesNumber / articlesPerPage);

  return pageMax;
}
