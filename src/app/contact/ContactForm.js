"use client";

import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from "react-dom";
import { useEffect, useRef } from "react";

import { ibmNotItalic } from "@/assets/fonts";

import { sendMail } from "./actions";

const initialState = {
  message: null,
};

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="m-3 px-3 py-2 border border-terra-600 shadow shadow-terra-700 bg-terra-100 text-slate-600 flex flex-row"
      aria-disabled={pending}
    >
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-terra-500 border-solid"></div>
      ) : (
        <div>Envoyer</div>
      )}
    </button>
  );
}

export default function ContactForm({ subject }) {
  const [state, formAction] = useFormState(sendMail, initialState);
  const refForm = useRef();
  const readOnly = Boolean(subject);

  useEffect(() => {
    if (state.status === 200) {
      refForm.current?.reset();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      ref={refForm}
      className="flex flex-col justify-center items-center w-11/12 sm:w-1/3 px-6 py-3 border border-terra-500 bg-slate-100 rounded-lg"
    >
      <label htmlFor="subject" className="text-terra-500">
        Sujet
      </label>
      <input
        id="subject"
        type="text"
        name="subject"
        defaultValue={subject}
        readOnly={readOnly}
        required
        className={`${ibmNotItalic.className} text-slate-700 w-full mt-1 mb-10 border border-terra-300 focus:border-2 focus:border-terra-500 focus:outline-none p-1 rounded-lg`}
      />

      <label htmlFor="message" className="text-terra-500">
        Votre message
      </label>
      <textarea
        id="message"
        type="text"
        name="message"
        rows="5"
        required
        className={`${ibmNotItalic.className} text-slate-700 w-full mt-1 mb-10 border border-terra-300 focus:border-2 focus:border-terra-500 focus:outline-none p-1 rounded-lg`}
      />

      <label htmlFor="mail" className="text-terra-500">
        Votre adresse mail
      </label>
      <input
        id="mail"
        type="email"
        name="mail"
        required
        className={`${ibmNotItalic.className} text-slate-700 not-italic w-full mt-1 mb-10 border border-terra-300 focus:border-2 focus:border-terra-500 focus:outline-none p-1 rounded-lg`}
      />

      <div className="text-justify text-terra-500 font-bold">
        {state.message}
      </div>
      <SubmitButton />
    </form>
  );
}
