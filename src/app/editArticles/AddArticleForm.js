"use client";

import { experimental_useFormState as useFormState } from "react-dom";
import { useCallback, useRef, useState } from "react";

import { createArticle } from "@/api/editArticles/actions";

import { types } from "@/assets/globals";

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

  return (
    <form
      ref={refForm}
      action={(formData) => {
        formAction(formData);
        refForm.current?.reset();
      }}
    >
      <label htmlFor="title">Nom</label>
      <input
        type="text"
        id="title"
        name="title"
        required
        style={{ width: "30vw" }}
      />

      {types.map((type) => (
        <div key={type.name}>
          <label htmlFor={type.name}>{type.name}</label>
          <input
            id={type.name}
            type="radio"
            name="type"
            value={type.name}
            required
          />
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

      <button
        type="submit"
        className="border border-terra-800 bg-slate-100 text-terra-800"
      >
        Ajouter un article
      </button>

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
