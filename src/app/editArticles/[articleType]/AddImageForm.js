"use client";

import { experimental_useFormState as useFormState } from "react-dom";
import { useRef } from "react";

import { addImage } from "@/api/editArticles/actions";

const initialState = {
  message: null,
};

export function AddImageForm({ articleId }) {
  const addImageWithArticleId = addImage.bind(null, articleId);
  const [state, formAction] = useFormState(addImageWithArticleId, initialState);

  const refForm = useRef();

  return (
    <form
      ref={refForm}
      action={(formData) => {
        formAction(formData);
        refForm.current?.reset();
      }}
    >
      <label htmlFor="file">
        Ajouter une image au carousel de l&apos;article
      </label>
      <input id="file" type="file" name="file" required />
      <button
        type="submit"
        className="border border-terra-800 bg-slate-100 text-terra-800"
      >
        Ajouter l&apos;image
      </button>
    </form>
  );
}
