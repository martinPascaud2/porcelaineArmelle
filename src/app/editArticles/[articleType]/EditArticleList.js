import { revalidatePath } from "next/cache";
const { PrismaClient } = require("@prisma/client");

import CldImage from "@/components/CloudImage";
import { DeleteArticle } from "../DeleteArticle";
import { DeleteImage } from "../DeleteImage";
import { DeleteMain } from "../DeleteMain";
import { AddImageForm } from "../AddImageForm";

const prisma = new PrismaClient();

export async function EditArticleList({ articleType }) {
  let articles;
  try {
    articles = await prisma.article.findMany({
      where: {
        type: decodeURIComponent(articleType),
      },
      include: {
        imageList: true,
      },
    });
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }

  const deleteArticle = async (id) => {
    "use server";
    try {
      await prisma.article.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Article deletion aborted:");
    }
  };

  const deleteImage = async (id) => {
    "use server";
    try {
      await prisma.image.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Image deletion aborted:");
    }
  };

  const deleteMain = async (article) => {
    "use server";
    try {
      const articleId = article.id;
      const oldMainImageId = article.imageList[0].id;
      const newMainUrl = article.imageList[1].url;

      await prisma.image.delete({
        where: {
          id: oldMainImageId,
        },
      });

      await prisma.article.update({
        where: {
          id: articleId,
        },
        data: {
          mainImage: newMainUrl,
        },
      });

      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Main image deletion aborted:");
    }
  };

  return (
    <h1>
      <div>articleType : {articleType}</div>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <div>{article.titre}</div>
            <div>{article.type}</div>
            <div>{article.contenu}</div>
            <CldImage
              width={960}
              height={600}
              style={{ width: "auto", height: "auto" }}
              src={article.mainImage}
              sizes="10vw"
              alt="Description of my image"
              priority
            />
            {article.imageList.length > 1 && (
              <DeleteMain deleteMain={deleteMain} article={article} />
            )}
            {article.imageList.slice(1).map((image) => (
              <div key={image.id}>
                <CldImage
                  width={960}
                  height={600}
                  style={{ width: "auto", height: "auto" }}
                  src={image.url}
                  sizes="10vw"
                  alt={`Image de l'article ${article.titre}`}
                  priority
                />
                <DeleteImage id={image.id} deleteImage={deleteImage} />
              </div>
            ))}
            <AddImageForm articleId={article.id} />
            <DeleteArticle id={article.id} deleteArticle={deleteArticle} />
            <p>-----------------</p>
          </div>
        );
      })}
    </h1>
  );
}
