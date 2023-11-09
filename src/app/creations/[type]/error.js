"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute top-1/2 flex flex-col justify-center items-center">
      <h2>
        Il y a eu une erreur lors de la récupération des articles. Veuillez
        réessayer.
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-md px-3 py-3 bg-terra-700 text-base font-medium text-slate-100"
      >
        Recharger
      </button>
    </div>
  );
}
