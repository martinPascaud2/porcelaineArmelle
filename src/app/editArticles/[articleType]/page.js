import { EditArticleList } from "./EditArticleList";

export default async function Page({ params }) {
  const { articleType } = params;
  return (
    <>
      <div>début page</div>
      <div>My Post: {articleType}</div>
      <p>-------------</p>
      <EditArticleList articleType={articleType} />
      <div>fin page</div>
    </>
  );
}
