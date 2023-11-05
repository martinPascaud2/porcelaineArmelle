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
      <label htmlFor="description">Description de ce type d'article</label>
      <textarea
        placeholder={`Description des ${articleType}`}
        id="description"
        type="textarea"
        name="description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.currentTarget.value)}
        style={{ resize: "both" }}
        rows="3"
        cols="33"
      />
      <button type="submit">Modifier la description</button>
    </form>
  );
}
