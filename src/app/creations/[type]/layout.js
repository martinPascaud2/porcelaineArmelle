import Pagination from "./Pagination";
import getPageMax from "@/utils/getPageMax";

export default async function TypeArticleLayout({ params, children }) {
  //   console.log("TypeArticleLayout props", props);
  const type = params.type;
  console.log("type typeArticleLayout blabla", type);
  const pageMax = await getPageMax(decodeURIComponent(type));
  console.log("pagemax", pageMax);
  return (
    <div className="flex flex-col items-center">
      <div>{children}</div>
      <Pagination pageMax={pageMax} />
    </div>
  );
}
