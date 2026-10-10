"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="mt-7 grid gap-5">
      <label className="grid gap-2 text-sm font-medium" htmlFor="email">
        E-mail
        <input
          autoComplete="email"
          className="min-h-12 rounded-xl border border-line bg-white px-4 text-base text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          id="email"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium" htmlFor="password">
        Heslo
        <input
          autoComplete="current-password"
          className="min-h-12 rounded-xl border border-line bg-white px-4 text-base text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          id="password"
          name="password"
          required
          type="password"
        />
      </label>
      {state.error && (
        <p aria-live="polite" className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
      <button
        className="min-h-12 rounded-xl bg-brand px-5 font-semibold text-white transition hover:bg-brand-strong disabled:cursor-wait disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Přihlašování…" : "Přihlásit se"}
      </button>
    </form>
  );
}