import { site } from "@/lib/content";

// The nav is the one element that sits over both the dark stage and the light
// body, so it takes the dark treatment permanently rather than switching
// surface halfway down the page and shifting under the reader's eye. The
// progress rail above it is pure CSS (see globals.css) and installs itself
// only in a browser that can drive a scroll timeline.
const links = [
  { href: "#study", label: "Study", n: "01" },
  { href: "#model", label: "Model", n: "02" },
  { href: "#run", label: "Training", n: "03" },
  { href: "#dataset", label: "Datasets", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
];

export default function Nav() {
  return (
    <>
      <div className="progress-rail" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-ink-rule bg-ink/90 text-white backdrop-blur">
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6"
        >
          <a href="#top" className="shrink-0 text-base tracking-tight">
            <span className="font-light text-ink-soft">
              {site.wordmark[0]}{" "}
            </span>
            <span className="wide font-bold">{site.wordmark[1]}</span>
          </a>

          <div className="flex items-center gap-7 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group hidden items-baseline gap-1.5 text-ink-soft transition-colors hover:text-white md:inline-flex"
              >
                <span className="text-[0.625rem] tabular-nums text-signal-soft">
                  {l.n}
                </span>
                {l.label}
              </a>
            ))}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="border border-signal px-3 py-1.5 font-medium text-white transition-colors hover:bg-signal"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
