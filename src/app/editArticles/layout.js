import Link from "next/link";

import { AddArticleForm } from "./AddArticleForm";

import { types } from "@/assets/globals";

export default function editArticlesLayout({ children }) {
  return (
    <div>
      <AddArticleForm />
      <div className="flex flex-row mt-32">
        {types.map((type) => (
          <div
            key={type.name}
            className="flex flex-row justify-center border grow"
          >
            <Link href={`/editArticles/${type.name}`}>{type.name}</Link>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
