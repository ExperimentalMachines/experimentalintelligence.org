import { site, team } from "@/lib/content";

export default function Team() {
  return (
    <section id="people" className="scroll-mt-28 lg:scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="display max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          The people behind it.
        </h2>
        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:mt-12 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5">
          {team.map((m) => (
            <li key={m.name} className="border-t border-ink pt-5">
              <p className="display text-xl leading-tight">{m.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{m.role}</p>
              {m.href && (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-sm underline decoration-rule underline-offset-4 hover:decoration-ink"
                >
                  {m.label}
                  <span className="sr-only">, {m.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <div
          id="contact"
          className="mt-12 flex scroll-mt-28 flex-col gap-8 rounded-3xl bg-bench p-6 sm:mt-20 sm:p-10 md:flex-row md:items-end md:justify-between lg:scroll-mt-20"
        >
          <div>
            <h3 className="display text-3xl sm:text-4xl">Working on small models?</h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft">
              Tell us the model, what you trained it to do, and what you measured.
            </p>
          </div>
          {/* Plain links, as on the original site: an address never wraps mid-word. */}
          <ul className="shrink-0 space-y-2">
            {site.emails.map((e) => (
              <li key={e}>
                <a
                  href={`mailto:${e}`}
                  className="inline-flex min-h-11 items-center whitespace-nowrap text-[0.85rem] text-violet-deep min-[360px]:text-[0.95rem] underline decoration-violet/40 underline-offset-4 hover:decoration-violet-deep min-[400px]:text-lg"
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
