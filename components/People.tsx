import SectionMarker from "@/components/SectionMarker";
import { people, site } from "@/lib/content";

// The page opens dark and closes dark. Everything between them is paper; the
// bookends are the two places where we are talking to the reader rather than
// showing them a measurement.
export default function People() {
  return (
    <section
      id="contact"
      className="stage scroll-mt-14 border-t-2 border-signal text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 md:grid-cols-2 md:gap-16">
        <div>
          <SectionMarker n="05" label="Contact" tone="dark" />
          <h2 className="display-sm reveal mt-6 text-white">
            Working on something similar?
          </h2>
          <p className="reveal mt-5 max-w-md leading-7 text-ink-soft">
            {site.description}
          </p>
          <ul className="reveal mt-8 space-y-2">
            {site.emails.map((e) => (
              <li key={e}>
                <a
                  href={`mailto:${e}`}
                  className="text-lg text-signal-soft underline underline-offset-4 hover:text-white"
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="reveal self-end text-sm">
          {people.map((p) => (
            <li
              key={p.name}
              className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-ink-rule py-4"
            >
              <span>
                <span className="font-medium text-white">{p.name}</span>
                <span className="text-ink-soft"> {p.role}</span>
              </span>
              <span className="flex gap-4">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal-soft hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal-soft hover:text-white"
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