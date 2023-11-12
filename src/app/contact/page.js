const { PrismaClient } = require("@prisma/client");

import { ibm } from "@/assets/fonts";

import ContactForm from "./ContactForm";

export default async function Page({ searchParams }) {
  const id = parseInt(searchParams.id);

  const prisma = new PrismaClient();
  let article;
  if (id) {
    try {
      article = await prisma.article.findFirst({
        where: {
          id: id,
        },
      });

      await prisma.$disconnect();
    } catch (error) {
      await prisma.$disconnect();
      throw new Error("Getting contact article error" + error);
    }
  }

  const subject = id ? `Création : ${article?.titre}` : "";

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1
        className={`w-11/12 text-center ${ibm.className} text-terra-500 text-3xl mb-6 sm:mb-12`}
      >
        Contactez-moi ! Je vous répondrai rapidement.
      </h1>
      <ContactForm subject={subject} />
    </div>
  );
}
