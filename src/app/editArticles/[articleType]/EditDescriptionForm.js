"use client";

import { experimental_useFormState as useFormState } from "react-dom";
import { useState } from "react";

import { editTypeDescription } from "@/api/editArticles/actions";

const initialState = {
  message: null,
};

export default function EditDescriptionForm({ articleType, description }) {
  const editDescriptionWithType = editTypeDescription.bind(null, articleType);
  const [state, formAction] = useFormState(
    editDescriptionWithType,
    initialState
  );

  const [newDescription, setNewDescription] = useState(description);

  return (
    <form action={formAction}>
      <label htmlFor="description">
        Présentation générale de {articleType}
      </label>
      <textarea
        placeholder={`Description des ${articleType}`}
        id="description"
        type="text"
        name="description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.currentTarget.value)}
        rows="10"
        cols="100"
        style={{ resize: "both" }}
      />
      <button
        type="submit"
        className="border border-terra-800 bg-slate-100 text-terra-800"
      >
        Modifier la présentation générale
      </button>
    </form>
  );
}
