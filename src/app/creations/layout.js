import Header from "./header";
// import Pagination from "./Pagination";
// import { headers } from "next/headers";
// import getPageMax from "@/utils/getPageMax";

export default function CreationsLayout(props) {
  // const headersList = headers();

  // console.log("headersList", headersList);
  // const fullUrl = headersList.get("referer") || "";
  // console.log("fullUrl", fullUrl);
  // await getPageMax();
  // let maxPage;
  // try {
  //   maxPage = await prisma.article.count({
  //     where: {

  //     },
  //   })
  //   await prisma.$disconnect();
  // } catch (error) {
  //   console.error(error);
  //   await prisma.$disconnect();
  // }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex flex-col justify-end">
        <div>{props.children}</div>
      </main>
      {/* <Pagination /> */}
    </div>
  );
}
