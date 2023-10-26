import { revalidatePath } from "next/cache";
const { PrismaClient } = require("@prisma/client");

import CldImage from "../components/CloudImage";
import { DeleteArticle } from "./DeleteArticle";

const prisma = new PrismaClient();

export async function EditArticleList() {
  let articles;
  try {
    articles = await prisma.articles.findMany();
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }

  const deleteArticle = async (id) => {
    "use server";
    try {
      await prisma.articles.delete({
        where: {
          id: id,
        },
      });
      revalidatePath("/editArticles");
    } catch (error) {
      console.error(error);
      throw new Error("Deletion aborted:");
    }
  };

  return (
    <h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <div>{article.titre}</div>
            <div>{article.contenu}</div>
            {article.image && (
              <CldImage
                width={960}
                height={600}
                style={{ width: "auto", height: "auto" }}
                src={article.image}
                sizes="10vw"
                alt="Description of my image"
                priority
              />
            )}
            <DeleteArticle id={article.id} deleteArticle={deleteArticle} />
            <p>-----------------</p>
          </div>
        );
      })}
    </h1>
  );
}
