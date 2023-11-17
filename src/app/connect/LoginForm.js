"use client";

import { experimental_useFormState as useFormState } from "react-dom";

import { connect } from "@/api/connect/actions";

const initialState = {
  message: "Mot de passe",
  status: 100,
};

export function LoginForm() {
  const [state, formAction] = useFormState(connect, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center"
    >
      <label htmlFor="password">{state.message}</label>
      <input
        type="password"
        name="password"
        id="password"
        autoFocus
        className="border border-terra-800 focus:outline-none focus:border-2 focus:border-terra-800"
      />
      <button type="submit">Se connecter</button>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}
