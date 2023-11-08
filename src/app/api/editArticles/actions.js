"use server";

import { revalidatePath } from "next/cache";

const DatauriParser = require("datauri/parser");
const { PrismaClient } = require("@prisma/client");

import { uploadImage } from "@/utils/cloudinary";

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
    const prisma = new PrismaClient();

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

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Article creation failed:" + error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Article ajouté" };
}

export async function addImage(articleId, prevState, formData) {
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new DatauriParser();
  const imgUri = parser.format(".png", buffer);

  const imageData = await uploadImage(imgUri.content);
  const { public_id } = imageData;

  try {
    const prisma = new PrismaClient();

    await prisma.image.create({
      data: {
        url: public_id,
        articleId: articleId,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Image adding failed :" + error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Image ajoutée" };
}

export async function editTypeDescription(articleType, prevState, formData) {
  const newDescription = formData.get("description");

  try {
    const prisma = new PrismaClient();

    await prisma.description.upsert({
      where: {
        type: articleType,
      },
      update: { description: newDescription },
      create: { type: articleType, description: newDescription },
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Global description updating failed" + error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Description mise à jour" };
}

export async function editArticleName(articleId, prevState, formData) {
  const newName = formData.get("newName");

  try {
    const prisma = new PrismaClient();

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        titre: newName,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Name editing failed" + error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Nom mis à jour" };
}

export async function editArticleContent(articleId, prevState, formData) {
  const newContent = formData.get("newContent");

  try {
    const prisma = new PrismaClient();

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        contenu: newContent,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Content editing failed" + error);
  }

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Description mise à jour" };
}
