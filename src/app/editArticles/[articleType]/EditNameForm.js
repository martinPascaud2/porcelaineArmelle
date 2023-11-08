"use client";

import { experimental_useFormState as useFormState } from "react-dom";
import { useState } from "react";

import { editArticleName } from "@/api/editArticles/actions";

const initialState = {
  message: null,
};

export default function EditNameForm({ articleId, name }) {
  const editNameWithId = editArticleName.bind(null, articleId);
  const [state, formAction] = useFormState(editNameWithId, initialState);

  const [newName, setNewName] = useState(name);

  return (
    <form action={formAction}>
      <label htmlFor="newName">Nom de l&apos;article</label>
      <input
        placeholder="Nom de l'article"
        id="newName"
        type="text"
        name="newName"
        value={newName}
        onChange={(e) => setNewName(e.currentTarget.value)}
        style={{ width: "30vw" }}
      />
      <button
        type="submit"
        className="border border-terra-800 bg-slate-100 text-terra-800"
      >
        Modifier le nom de l&apos;article
      </button>
    </form>
  );
}
