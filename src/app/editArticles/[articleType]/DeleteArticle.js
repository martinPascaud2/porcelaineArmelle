"use client";

export function DeleteArticle({ deleteArticle, id }) {
  return (
    <button
      onClick={() => deleteArticle(id)}
      className="border border-slate-100 bg-terra-800 text-slate-100"
    >
      Supprimer l&apos;article
    </button>
  );
}
