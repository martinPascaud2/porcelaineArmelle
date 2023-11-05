import Image from "next/image";
import { amatic, inter, ibm } from "@/assets/fonts";
import Link from "next/link";

import { articlesPerPage } from "@/assets/globals";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import Modal from "../modal";

const Card = ({ article }) => {
  const imageUrl = cloudinary.url(article.mainImage);

  return (
    <div className="border border-terra-500 border rounded-lg max-w-sm w-full h-fit ">
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
      <div className="p-5 rounded-b-lg border-t border-slate-400 bg-slate-100 flex flex-col">
        <h5
          className={`${amatic.className} text-3xl font-bold text-terra-500  self-center	mb-6`}
        >
          {article.titre}
        </h5>
        {article.contenu && (
          <div>
            <hr className="h-px mx-32 my-0 py-0 bg-slate-300 border-0" />
            <p
              className={`${ibm.className} text-md text-terra-500 my-4 text-justify	leading-snug	`}
            >
              {article.contenu}
            </p>
          </div>
        )}

        <div className="flex flex-inline ">
          <Link
            href={`/creations?modal=${article.id}#carousel`}
            className={`${inter.className} bg-terra-100 border border-slate-400 rounded-lg rounded-md mx-4 my-2 px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function Page({ params, searchParams }) {
  const { modal: modalId, page } = searchParams;
  if (modalId !== undefined) {
    return <Modal images={carouselImages} />;
  }

  const paramType = decodeURIComponent(params.type);
  let articles;
  try {
    articles = await prisma.article.findMany({
      where: {
        type: paramType,
      },
      skip: (parseInt(page) - 1) * articlesPerPage,
      take: articlesPerPage,
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }

  return (
    <>
      {page === "1" && (
        <div
          className={`${ibm.className} m-12 sm:m-20 text-center text-3xl text-bold text-terra-500  w-11/12 sm:w-2/3`}
        >
          Les verseuses Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
          adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
          Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
          porttitor, orci nec nonummy molestie, enim est eleifend mi, non
          fermentum diam nisl sit amet erat. Duis semper. les verseuses
        </div>
      )}
      <div className=" flex justify-center">
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
