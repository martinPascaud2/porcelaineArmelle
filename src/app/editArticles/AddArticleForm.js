"use client";

import { useCallback, useEffect, useRef } from "react";
import { experimental_useFormState as useFormState } from "react-dom";

import { createArticle } from "@/api/editArticles/actions";
import { useState } from "react";

const initialState = {
  message: null,
};

export function AddArticleForm() {
  const [state, formAction] = useFormState(createArticle, initialState);
  const refForm = useRef();

  const [fileInputs, setFileInputs] = useState([]);
  const [index, setIndex] = useState(1);

  const deleteInput = useCallback((i) => {
    setFileInputs((prevFileInputs) => {
      const newFileInputs = prevFileInputs.filter(
        (input) => input.props.id !== i
      );
      return newFileInputs;
    });
  }, []);

  const addInput = useCallback(() => {
    setFileInputs((prevFileInputs) => [
      ...prevFileInputs,
      <div key={index} id={index}>
        <input type="file" name="file" required />
        <button onClick={() => deleteInput(index)}>Enlever</button>
      </div>,
    ]);
    setIndex((prevIndex) => prevIndex + 1);
  }, [index, deleteInput]);

  const types = ["Verseuses", "Coulée verte", "Truc"];

  return (
    <form
      ref={refForm}
      action={async (formData) => {
        formAction(formData);
        refForm.current?.reset();
      }}
    >
      <label htmlFor="title">Titre</label>
      <input type="text" id="title" name="title" required />

      {types.map((type) => (
        <div key={type}>
          <label htmlFor={type}>{type}</label>
          <input id={type} type="radio" name="type" value={type} required />
        </div>
      ))}

      <input key={0} type="file" name="file" required />

      {fileInputs}
      <button onClick={() => addInput()}>Image supplémentaire</button>
      <textarea
        type="text"
        name="content"
        placeholder="Description de l'article"
        style={{ resize: "both" }}
        rows="3"
        cols="33"
      />
      <button type="submit">Ajouter</button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
