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
      className="m-3 px-3 py-2 border border-terra-800 shadow shadow-terra-800 hover:shadow-none transition-shadow duration-300 ease-in-out bg-terra-100 text-terra-800"
      aria-disabled={pending}
    >
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-terra-800 border-solid"></div>
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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <form
      action={formAction}
      ref={refForm}
      className="flex flex-col justify-center items-center w-11/12 sm:w-1/3 px-6 py-3 border-2 border-terra-800 bg-slate-100 rounded-lg"
    >
      <label htmlFor="subject" className="text-terra-800">
        Sujet
      </label>
      <input
        id="subject"
        type="text"
        name="subject"
        defaultValue={subject}
        readOnly={readOnly}
        disabled={readOnly}
        required
        className={`${ibmNotItalic.className} text-terra-800 w-full mt-1 mb-10 border border-terra-800 focus:border-2 focus:outline-none p-1 rounded-lg`}
      />

      <label htmlFor="message" className="text-terra-800">
        Votre message
      </label>
      <textarea
        id="message"
        type="text"
        name="message"
        rows="5"
        required
        className={`${ibmNotItalic.className} text-terra-800 w-full mt-1 mb-10 border border-terra-800 focus:border-2 focus:outline-none p-1 rounded-lg`}
      />

      <label htmlFor="mail" className="text-terra-800">
        Votre adresse mail
      </label>
      <input
        id="mail"
        type="email"
        name="mail"
        required
        className={`${ibmNotItalic.className} text-terra-800 w-full mt-1 mb-10 border border-terra-800 focus:border-2 focus:outline-none p-1 rounded-lg`}
      />

      <div className="text-justify text-terra-500 font-bold">
        {state.message}
      </div>
      <SubmitButton />
    </form>
  );
}
