import Link from "next/link";

import { AddArticleForm } from "./AddArticleForm";
import { types } from "@/assets/globals";

export default function editArticlesLayout({ children }) {
  return (
    <div>
      <div>début layout editArticles</div>
      <AddArticleForm />
      <div>avant types</div>
      {types.map((type) => (
        <div key={type}>
          <Link href={`/editArticles/${type}`}>{type}</Link>
        </div>
      ))}
      <div>après types</div>
      {children}
      <div>fin layout editArticles</div>
    </div>
  );
}
