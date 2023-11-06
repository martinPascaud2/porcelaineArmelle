import { EditArticleList } from "./EditArticleList";

export default async function Page({ params }) {
  const { articleType: type } = params;
  const articleType = decodeURIComponent(type);
  return (
    <>
      <div>début page</div>
      <div>Nom de ce type d&apos;article : {articleType}</div>
      <p>-------------</p>
      <EditArticleList articleType={articleType} />
      <div>fin page</div>
    </>
  );
}
