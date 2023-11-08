"use client";

export function DeleteMain({ article, deleteMain }) {
  return (
    <button
      onClick={() => deleteMain(article)}
      className="border border-slate-100 bg-terra-800 text-slate-100"
    >
      Supprimer l&apos;image principale
    </button>
  );
}
