import { site } from "@/lib/content";

// In the hero's violet and kept that colour on scroll, as on
// experimentalmachines.org.
const sections = [
  { href: "#opengrad", label: "OpenGrad" },
  { href: "#tool-choice", label: "Tool choice" },
  { href: "#from-scratch", label: "From scratch" },
  { href: "#taglish", label: "Taglish" },
  { href: "#people", label: "People" },
];

export default function Header() {
  return (
    <header className="on-violet sticky top-0 z-50 bg-violet text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-violet-deep"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="display shrink-0 whitespace-nowrap text-[1.05rem]">
          Experimental <span className="font-semibold">Intelligence</span>
        </a>
        <div className="hidden items-center gap-8 text-[0.95rem] text-white/85 lg:flex">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className="hover:text-white">
              {s.label}
            </a>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
        </div>
        <a
          href="#contact"
          className="hidden shrink-0 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-violet-deep hover:bg-white/90 min-[380px]:inline-block"
        >
          Contact
        </a>
      </nav>
      <nav aria-label="Sections" className="relative border-t border-white/15 lg:hidden">
        {/* A fade at the edge says the row scrolls. */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-violet" />
        <div className="flex gap-6 overflow-x-auto px-4 pr-12 text-sm text-white/85 sm:px-6 sm:pr-12">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className="inline-flex min-h-11 shrink-0 items-center hover:text-white">
              {s.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center hover:text-white"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
