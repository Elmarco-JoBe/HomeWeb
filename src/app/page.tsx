export default function Home() {
  const modes = [
    {
      code: "AUTO",
      title: "Automaticky",
      detail: "Raspberry Pi ridi topeni podle lokalni logiky.",
      active: true,
    },
    {
      code: "OFF",
      title: "Vypnuto",
      detail: "Systém zustane v bezpecnem vypnutem rezimu.",
      active: false,
    },
    {
      code: "MANUAL",
      title: "Manual",
      detail: "Rezervovano pro budouci rucni ovladani vystupu.",
      active: false,
    },
    {
      code: "FIREPLACE",
      title: "Krb",
      detail: "Predpriprava pro rezim s vyuzitim kamen.",
      active: false,
    },
  ];

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
                Prvni prototyp pro mobilni pouziti. Zmena rezimu je hotova az ve chvili,
                kdy ji potvrdi Raspberry Pi.
              </p>
            </div>
            <div className="rounded-full border border-ok/20 bg-ok/10 px-3 py-1 text-xs font-medium text-ok">
              Pi online
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-line/70 bg-brand px-5 py-5 text-white shadow-[0_24px_60px_rgba(29,64,51,0.28)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Synchronizace
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Pozadovany rezim</p>
              <p className="mt-1 text-2xl font-semibold">AUTO</p>
            </div>
            <div className="rounded-2xl bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Aktivni rezim</p>
              <p className="mt-1 text-2xl font-semibold">AUTO</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm">
            <span className="text-white/70">Posledni komunikace</span>
            <span className="font-medium">pred 12 s</span>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm">
            Posledni zmena probehla uspesne a byla potvrzena Raspberry Pi.
          </div>
        </section>

        <section className="rounded-[28px] border border-line/70 bg-surface px-4 py-4 shadow-[0_14px_38px_rgba(30,36,31,0.06)]">
          <div className="flex items-center justify-between px-1 pb-3">
            <div>
              <h2 className="text-lg font-semibold">Vyber rezimu</h2>
              <p className="mt-1 text-sm text-muted">
                Datovy model zustane otevreny pro dalsi rezimy.
              </p>
            </div>
            <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-muted">
              MVP
            </span>
          </div>

          <div className="grid gap-3">
            {modes.map((mode) => (
              <button
                key={mode.code}
                type="button"
                className={`w-full rounded-[24px] border px-4 py-4 text-left transition-transform active:scale-[0.98] ${
                  mode.active
                    ? "border-brand-strong bg-brand text-white shadow-[0_16px_32px_rgba(41,89,72,0.24)]"
                    : "border-line bg-white/70 text-foreground"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{mode.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-[0.18em] ${
                          mode.active
                            ? "bg-white/15 text-white"
                            : "bg-surface-strong text-muted"
                        }`}
                      >
                        {mode.code}
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        mode.active ? "text-white/78" : "text-muted"
                      }`}
                    >
                      {mode.detail}
                    </p>
                  </div>
                  <span
                    className={`mt-1 h-3.5 w-3.5 rounded-full ${
                      mode.active ? "bg-[#f2c14f]" : "bg-line"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-dashed border-line bg-surface/80 px-5 py-4 text-sm leading-6 text-muted">
          Dalsi krok je napojit tuto obrazovku na Supabase Auth, databazovy stav a potvrzovani rezimu z Raspberry Pi.
        </section>
      </div>
    </main>
  );
}
