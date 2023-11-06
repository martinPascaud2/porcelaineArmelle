"use client";

import { experimental_useFormState as useFormState } from "react-dom";

import { connect } from "@/api/connect/actions";

const initialState = {
  message: "Ton mot de passe",
  status: 100,
};

export function LoginForm() {
  const [state, formAction] = useFormState(connect, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="password">{state.message}</label>
      <input type="password" name="password" id="password" autoFocus />
      <button type="submit">Se connecter</button>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}
