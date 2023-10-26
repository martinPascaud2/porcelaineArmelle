"use client";

export function DeleteArticle({ deleteArticle, id }) {
  return <button onClick={() => deleteArticle(id)}>Supprimer</button>;
}
