"use client";

import { experimental_useFormState as useFormState } from "react-dom";
import { useState } from "react";

import { editArticleContent } from "@/api/editArticles/actions";

const initialState = {
  message: null,
};

export default function EditContentForm({ articleId, content }) {
  const editContentWithId = editArticleContent.bind(null, articleId);
  const [state, formAction] = useFormState(editContentWithId, initialState);

  const [newContent, setNewContent] = useState(content);

  return (
    <form action={formAction}>
      <label htmlFor="newContent">Description</label>
      <textarea
        placeholder="Description de l'article"
        id="newContent"
        type="text"
        name="newContent"
        value={newContent}
        onChange={(e) => setNewContent(e.currentTarget.value)}
        style={{ resize: "both" }}
        rows="3"
        cols="100"
      />
      <button
        type="submit"
        className="border border-terra-800 bg-slate-100 text-terra-800"
      >
        Modifier la description de l&apos;article
      </button>
    </form>
  );
}
