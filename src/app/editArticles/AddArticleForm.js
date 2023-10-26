"use client";

import { useRef } from "react";
import { experimental_useFormState as useFormState } from "react-dom";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { createArticle } from "@/api/editArticles/actions";

const initialState = {
  message: null,
};

export function AddArticleForm() {
  const [state, formAction] = useFormState(createArticle, initialState);
  const refForm = useRef();

  return (
    <form
      ref={refForm}
      action={async (formData) => {
        formAction(formData);
        refForm.current?.reset();
      }}
    >
      <input type="text" name="title" required />
      <input type="text" name="content" required />
      <input type="file" name="file" required />
      <button type="submit">Ajouter</button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
