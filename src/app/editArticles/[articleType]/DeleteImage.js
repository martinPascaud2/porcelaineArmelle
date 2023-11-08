"use client";

export function DeleteImage({ deleteImage, id }) {
  return (
    <button
      onClick={() => deleteImage(id)}
      className="border border-slate-100 bg-terra-800 text-slate-100"
    >
      Supprimer l&apos;image
    </button>
  );
}
