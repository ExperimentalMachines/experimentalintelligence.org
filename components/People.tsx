import { people, site } from "@/lib/content";

export default function People() {
  return (
    <section id="contact" className="scroll-mt-14 border-t border-rule bg-plate">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 md:grid-cols-2">
        <div>
          <h2 className="wide text-4xl font-bold tracking-tight sm:text-5xl">
            Working on something similar?
          </h2>
          <ul className="mt-5 space-y-2">
            {site.emails.map((e) => (
              <li key={e}>
                <a
                  href={`mailto:${e}`}
                  className="text-lg text-signal underline underline-offset-4 hover:text-signal-deep"
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="self-end text-sm">
          {people.map((p) => (
            <li
              key={p.name}
              className="flex justify-between gap-6 border-b border-rule py-3"
            >
              <span>
                <span className="font-medium">{p.name}</span>
                <span className="text-carbon-soft"> {p.role}</span>
              </span>
              <span className="flex gap-4">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal hover:text-signal-deep"
                >
                  GitHub
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal hover:text-signal-deep"
                >
                  LinkedIn
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
