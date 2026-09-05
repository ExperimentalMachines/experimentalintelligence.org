import { dataset, further } from "@/lib/content";

export default function Dataset() {
  return (
    <section id="dataset" className="scroll-mt-14 border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <h2 className="wide text-4xl font-bold tracking-tight sm:text-5xl">
              {dataset.name}
            </h2>
            <p className="mt-4 max-w-md leading-7 text-carbon-soft">
              {dataset.summary}
            </p>
            <a
              href={dataset.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
            >
              Download on Kaggle
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-px self-start bg-rule sm:grid-cols-5">
            {dataset.facts.map(([k, v]) => (
              <div key={k} className="bg-lab p-4">
                <dd className="wide text-2xl font-bold tabular-nums">{v}</dd>
                <dt className="mt-1 text-sm text-carbon-soft">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-16 border-t border-rule">
          {further.map((f) => (
            <li
              key={f.name}
              className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[16rem_1fr_6rem] sm:items-baseline sm:gap-6"
            >
              {f.href ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-signal hover:text-signal-deep"
                >
                  {f.name}
                </a>
              ) : (
                <span className="font-medium">{f.name}</span>
              )}
              <span className="text-sm text-carbon-soft">{f.desc}</span>
              <span className="text-sm text-carbon-soft sm:text-right">{f.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
