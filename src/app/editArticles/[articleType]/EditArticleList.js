import { revalidatePath } from "next/cache";
const { PrismaClient } = require("@prisma/client");

import CldImage from "@/components/CloudImage";
import { DeleteArticle } from "../DeleteArticle";
import { DeleteImage } from "../DeleteImage";
import { DeleteMain } from "../DeleteMain";
import { AddImageForm } from "../AddImageForm";
import EditDescriptionForm from "./EditDescriptionForm";
import EditNameForm from "./EditNameForm";
import EditContentForm from "./EditContentForm";

export async function EditArticleList({ articleType: type }) {
  const articleType = decodeURIComponent(type);
  let articles;
  let description;
  try {
    const prisma = new PrismaClient();
    articles = await prisma.article.findMany({
      where: {
        type: articleType,
      },
      include: {
        imageList: true,
      },
    });
    description = await prisma.description.findFirst({
      where: {
        type: articleType,
      },
      select: {
        description: true,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    throw new Error("Articles finding aborted:");
    await prisma.$disconnect();
  }

  const deleteArticle = async (id) => {
    "use server";
    try {
      const prisma = new PrismaClient();
      await prisma.article.delete({
        where: {
          id: id,
        },
      });

      await prisma.$disconnect();
      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Article deletion aborted:");
      await prisma.$disconnect();
    }
  };

  const deleteImage = async (id) => {
    "use server";
    try {
      const prisma = new PrismaClient();
      await prisma.image.delete({
        where: {
          id: id,
        },
      });

      await prisma.$disconnect();
      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Image deletion aborted:");
      await prisma.$disconnect();
    }
  };

  const deleteMain = async (article) => {
    "use server";
    try {
      const prisma = new PrismaClient();
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

      await prisma.$disconnect();
      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Main image deletion aborted:");
      await prisma.$disconnect();
    }
  };

  return (
    <h1>
      <div>articleType : {articleType}</div>
      <EditDescriptionForm
        articleType={articleType}
        description={description?.description}
      />

      <p>-----------------</p>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <EditNameForm articleId={article.id} name={article.titre} />
            <EditContentForm articleId={article.id} content={article.contenu} />
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
