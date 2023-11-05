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

export async function editTypeDescription(articleType, prevState, formData) {
  console.log("articleType action", articleType, typeof articleType);
  const newDescription = formData.get("description");
  console.log("newDescription ici", newDescription);

  await prisma.description.upsert({
    where: {
      type: articleType,
    },
    update: { description: newDescription },
    create: { type: articleType, description: newDescription },
  });

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Description mise à jour" };
}

export async function editArticleName(articleId, prevState, formData) {
  const newName = formData.get("newName");

  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      titre: newName,
    },
  });

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Nom mis à jour" };
}

export async function editArticleContent(articleId, prevState, formData) {
  const newContent = formData.get("newContent");

  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      contenu: newContent,
    },
  });

  revalidatePath("/creations");
  revalidatePath("/editArticles");
  return { message: "Description mise à jour" };
}
