import Image from "next/image";
import Link from "next/link";

const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { amatic, figtree, ibm } from "@/assets/fonts";
import { articlesPerPage } from "@/assets/globals";

const Card = ({ article }) => {
  const imageUrl = cloudinary.url(article.mainImage);

  return (
    <div className="border border-terra-800 border rounded-lg max-w-sm w-full h-fit">
      <Image
        alt={`Image de l'article ${article.titre}`}
        src={imageUrl}
        width={960}
        height={600}
        style={{
          width: "100%",
          height: "auto",
        }}
        className="rounded-t-lg"
      />

      <div className="p-5 rounded-b-lg border-t border-terra-800 bg-terra-100 flex flex-col">
        <h2
          className={`${amatic.className} text-4xl text-terra-800 font-bold self-center	mb-6`}
        >
          {article.titre}
        </h2>

        {article.contenu && (
          <div>
            <hr className="h-px mx-32 mb-6 py-0 bg-terra-800 border-0" />
            <p
              className={`${ibm.className} text-lg text-terra-800 my-4 mx-0 sm:mx-2 text-justify	leading-snug	`}
            >
              {article.contenu}
            </p>
          </div>
        )}

        <div className="flex flex-inline">
          <Link
            href={`/creations?modal=${article.id}#carousel`}
            className={`${figtree.className} bg-slate-100 border border-slate-800 rounded-lg rounded-md mx-4 my-2 px-3 py-2 text-base font-normal text-slate-800 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default async function Page({ params, searchParams }) {
  const { page } = searchParams;
  const paramType = decodeURIComponent(params.type);

  let articles;
  try {
    const prisma = new PrismaClient();

    articles = await prisma.article.findMany({
      where: {
        type: paramType,
      },
      skip: (parseInt(page) - 1) * articlesPerPage,
      take: articlesPerPage,
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Articles getting failed: " + error);
  }

  let description;
  try {
    const prisma = new PrismaClient();

    description = await prisma.description.findFirst({
      where: {
        type: paramType,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Global description getting failed:" + error);
  }

  return (
    <>
      {page === "1" && (
        <div
          className={`${ibm.className} m-12 sm:m-20 text-center text-3xl text-bold text-terra-800  w-11/12 sm:w-2/3 leading-relaxed`}
        >
          {description?.description}
        </div>
      )}

      <div className="flex justify-center">
        <div
          className={`${
            parseInt(page) > 1 && "mt-12"
          } grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center  gap-x-12 gap-y-10`}
        >
          {articles?.map((article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
