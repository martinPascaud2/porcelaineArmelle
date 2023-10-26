"use server";

import { revalidatePath } from "next/cache";

import { uploadImage } from "@/utils/cloudinary";
const DatauriParser = require("datauri/parser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function createArticle(prevState, formData) {
  const title = formData.get("title");

  const content = formData.get("content");

  const file = formData.get("file");
  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new DatauriParser();
  const imgUri = parser.format(".png", buffer);
  const imageData = await uploadImage(imgUri.content);

  await prisma.articles.create({
    data: {
      titre: title,
      contenu: content,
      datePublication: new Date(),
      image: imageData.public_id,
    },
  });

  revalidatePath("/creations");
  revalidatePath("/editArticles");

  return { message: "Article ajouté" };
}
