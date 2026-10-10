import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.72),_transparent_38%),linear-gradient(180deg,_var(--background)_0%,_#e7dcc8_100%)] px-4 py-10 text-foreground sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-line/70 bg-surface p-6 shadow-[0_18px_50px_rgba(41,89,72,0.10)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          HomeHeat Control
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Přihlášení</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Přihlaste se ke vzdálenému ovládání vytápění.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}