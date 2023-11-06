import Modal from "./modal";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function Page({ searchParams }) {
  const modalId = parseInt(searchParams?.modal);

  if (!modalId) {
    return <div>La page création /</div>;
  }

  const article = await prisma.article.findFirst({
    where: {
      id: modalId,
    },
    include: {
      imageList: true,
    },
  });

  const imagesUrls = article.imageList.map((image) =>
    cloudinary.url(image.url)
  );

  return <Modal imagesUrls={imagesUrls} />;
}
