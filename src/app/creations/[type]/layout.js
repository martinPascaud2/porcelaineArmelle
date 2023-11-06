import Pagination from "./Pagination";
import getPageMax from "@/utils/getPageMax";

export default async function TypeArticleLayout({ params, children }) {
  const type = params.type;
  const pageMax = await getPageMax(decodeURIComponent(type));
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">{children}</div>
      <Pagination pageMax={pageMax} />
    </div>
  );
}
