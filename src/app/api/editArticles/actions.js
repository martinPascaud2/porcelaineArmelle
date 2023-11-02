"use server";

import { revalidatePath } from "next/cache";

import { uploadImage } from "@/utils/cloudinary";
const DatauriParser = require("datauri/parser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function createArticle(prevState, formData) {
  const type = formData.get("type");
  const title = formData.get("title");
  const content = formData.get("content");
  const files = formData.getAll("file");

  let filesUris = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const parser = new DatauriParser();
      const imgUri = parser.format(".png", buffer);
      return imgUri;
    })
  );

  const datas = await Promise.all(
    filesUris.map(async (uri) => {
      const imageData = await uploadImage(uri.content);
      return imageData;
    })
  );

  try {
    const imageList = datas.map((data) => ({
      url: data.public_id,
    }));
    await prisma.article.create({
      data: {
        type: type,
        titre: title,
        contenu: content,
        mainImage: datas[0].public_id,
        imageList: {
          create: imageList,
        },
        datePublication: new Date(),
      },
    });
  } catch (error) {
    console.error("Post error :", error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");

  return { message: "Article ajouté" };
}

// export async function addImage({ prevState, formData }) {
export async function addImage(articleId, prevState, formData) {
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new DatauriParser();
  const imgUri = parser.format(".png", buffer);

  const imageData = await uploadImage(imgUri.content);
  const { public_id } = imageData;

  await prisma.image.create({
    data: {
      url: public_id,
      articleId: articleId,
    },
  });

  revalidatePath("/creations");
  revalidatePath("/editArticles");

  return { message: "Image ajoutée" };
}
