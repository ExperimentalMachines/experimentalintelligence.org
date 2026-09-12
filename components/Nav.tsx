import { site } from "@/lib/content";

const links = [
  { href: "#study", label: "Study 001" },
  { href: "#model", label: "Model" },
  { href: "#run", label: "Training" },
  { href: "#dataset", label: "Dataset" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-lab/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" className="text-base tracking-tight">
          <span className="font-light">{site.wordmark[0]} </span>
          <span className="wide font-bold">{site.wordmark[1]}</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-carbon-soft hover:text-carbon sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-signal hover:text-signal-deep"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
