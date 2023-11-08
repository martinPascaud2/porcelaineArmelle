import { ArticleList } from "./ArticleList";

export default async function Page({ params }) {
  const { articleType: type } = params;
  const articleType = decodeURIComponent(type);

  return (
    <>
      <div className="bg-slate-100 font-bold	">
        <hr />
        <hr />
        Type d&apos;article sélectionné : {articleType}
        <hr />
        <hr />
      </div>
      <ArticleList articleType={articleType} />
    </>
  );
}
