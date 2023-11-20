import Image from "next/image";
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
import { ArrowUpIcon } from "@heroicons/react/24/outline";

import { ibm } from "@/assets/fonts";
import { globalPresentation } from "@/assets/globals";

import Modal from "./modal";
import ScrollToTop from "@/components/ScrollToTop";

export default async function Page({ searchParams }) {
  const modalId = parseInt(searchParams?.modal);

  if (!modalId) {
    return (
      <div
        className={`${ibm.className} mx-auto text-terra-800 flex flex-col items-center`}
      >
        <div className="sticky top-48 sm:top-52 mt-6 border border-terra-800 bg-terra-100 text-terra-800 rounded-full animate-bounce">
          <ArrowUpIcon className="block m-4 h-8 w-8" />
        </div>
        <h1 className="w-11/12 sm:w-2/3 text-3xl text-bold text-center leading-relaxed">
          {globalPresentation}
        </h1>
        <Image
          alt="Photo de présentation"
          src={`${process.env.NEXT_PUBLIC_APP_URL}/calimero.jpeg`}
          width={1000}
          height={1000}
          className="mt-4 mb-4 sm:mb-0"
        />
        <ScrollToTop />
      </div>
    );
  }

  let articleName;
  let imagesUrls;
  try {
    const prisma = new PrismaClient();

    const article = await prisma.article.findFirst({
      where: {
        id: modalId,
      },
      include: {
        imageList: true,
      },
    });

    articleName = article.titre;
    imagesUrls = article.imageList.map((image) => cloudinary.url(image.url));

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Article getting failed:" + error);
  }

  return <Modal name={articleName} imagesUrls={imagesUrls} id={modalId} />;
}
