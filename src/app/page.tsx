import { Suspense } from "react";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-background px-4 text-muted">
          Načítání zabezpečeného dashboardu…
        </main>
      }
    >
      <HeatingDashboard />
    </Suspense>
  );
}

async function HeatingDashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.72),_transparent_38%),linear-gradient(180deg,_var(--background)_0%,_#e7dcc8_100%)] px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 pb-8">
        <section className="rounded-[28px] border border-line/70 bg-surface px-5 py-5 shadow-[0_18px_50px_rgba(41,89,72,0.10)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                HomeHeat Control
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
                Ovladani rezimu vytapeni
              </h1>
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                Přihlášeno jako {typeof claims.email === "string" ? claims.email : "uživatel"}.
              </p>
            </div>
            <form action={signOut}>
              <button
                className="min-h-10 rounded-lg border border-line px-3 text-sm font-medium text-muted transition hover:bg-surface-strong"
                type="submit"
              >
                Odhlásit
              </button>
            </form>
          </div>
        </section>

        <section className="rounded-[28px] border border-line/70 bg-brand px-5 py-5 text-white shadow-[0_24px_60px_rgba(29,64,51,0.28)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Synchronizace
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Pozadovany rezim</p>
              <p className="mt-1 text-2xl font-semibold">Zatím nenastaven</p>
            </div>
            <div className="rounded-2xl bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Aktivni rezim</p>
              <p className="mt-1 text-2xl font-semibold">Bez potvrzení</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm">
            <span className="text-white/70">Posledni komunikace</span>
            <span className="font-medium">Zatím žádná</span>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm">
            Raspberry Pi zatím není propojeno. Žádná změna nebyla odeslána ani potvrzena.
          </div>
        </section>

        <section className="rounded-[28px] border border-line/70 bg-surface px-4 py-4 shadow-[0_14px_38px_rgba(30,36,31,0.06)]">
          <h2 className="px-1 text-lg font-semibold">Režimy vytápění</h2>
          <p className="mt-2 px-1 text-sm leading-6 text-muted">
            Ovládání zpřístupníme až po potvrzení režimů a bezpečného chování Raspberry Pi.
          </p>
        </section>
      </div>
    </main>
  );
}
