const { PrismaClient } = require("@prisma/client");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import Modal from "./modal";

export default async function Page({ searchParams }) {
  const modalId = parseInt(searchParams?.modal);

  if (!modalId) {
    return <div>La page création /</div>;
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
    throw new Error("Article getting failed.");
  }

  return <Modal name={articleName} imagesUrls={imagesUrls} />;
}
