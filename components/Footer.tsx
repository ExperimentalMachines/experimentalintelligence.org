import { sibling, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink-rule bg-ink text-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-10">
        <div>
          <p className="text-sm">Two research efforts, one small team.</p>
          <p className="mt-2 text-lg tracking-tight">
            <span className="font-light text-ink-soft">
              {site.wordmark[0]}{" "}
            </span>
            <span className="wide font-bold text-white">
              {site.wordmark[1]}
            </span>
            <span className="mx-3 text-ink-rule">/</span>
            <a
              href={sibling.url}
              className="underline decoration-ink-rule underline-offset-4 transition-colors hover:text-white hover:decoration-signal"
            >
              {sibling.name}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          {site.emails.map((e) => (
            <a
              key={e}
              href={`mailto:${e}`}
              className="transition-colors hover:text-white"
            >
              {e}
            </a>
          ))}
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
