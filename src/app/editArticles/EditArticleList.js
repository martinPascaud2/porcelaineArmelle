import { revalidatePath } from "next/cache";
const { PrismaClient } = require("@prisma/client");

import CldImage from "../components/CloudImage";
import { DeleteArticle } from "./DeleteArticle";
import { DeleteImage } from "./DeleteImage";
import { DeleteMain } from "./DeleteMain";
import { AddImageForm } from "./AddImageForm";

const prisma = new PrismaClient();

export async function EditArticleList() {
  let articles;
  try {
    articles = await prisma.article.findMany({
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
      // await prisma.image.delete({
      //   where: {
      //     id: image.id,
      //   },
      // });

      // JSON.parse(JSON.stringify(data));

      // const newMain = articles.imageList[1].url;

      console.log("article", article);

      const articleId = article.id;
      console.log("articleId", articleId);

      const oldMainImageId = article.imageList[0].id;
      console.log("oldMainImageId", oldMainImageId);

      const newMainUrl = article.imageList[1].url;
      console.log("newMainUrl", newMainUrl);

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

      // await prisma.

      // const newMain = await prisma.article.findFirst({
      //   where: {
      //     id: articleId,
      //   },
      //   select: {
      //     imageList: {
      //       select: {
      //         url: true,
      //       },
      //       take: 1,
      //     },
      //   },
      // });
      // const newUrl = newMain.imageList[0].url;
      // console.log("newMain :", newMain);
      // console.log("newUrl :", newUrl);
      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Main image deletion aborted:");
    }
  };

  console.log("articles", articles);

  return (
    <h1>
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
            {article.imageList.slice(1).map((image) => {
              console.log("image", image);
              return (
                <div key={image.id}>
                  <CldImage
                    width={960}
                    height={600}
                    style={{ width: "auto", height: "auto" }}
                    src={image.url}
                    sizes="10vw"
                    alt="Description of my image"
                    priority
                  />
                  <DeleteImage id={image.id} deleteImage={deleteImage} />
                </div>
              );
            })}
            <AddImageForm articleId={article.id} />
            <DeleteArticle id={article.id} deleteArticle={deleteArticle} />
            <p>-----------------</p>
          </div>
        );
      })}
    </h1>
  );
}
