"use client";

export function DeleteMain({ article, deleteMain }) {
  return (
    <button onClick={() => deleteMain(article)}>
      Supprimer l{"'"}image principale
    </button>
  );
}
