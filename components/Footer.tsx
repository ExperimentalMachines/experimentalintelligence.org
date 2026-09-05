import { sibling, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-10">
        <div>
          <p className="text-sm text-carbon-soft">
            Two research efforts, one small team.
          </p>
          <p className="mt-2 text-lg tracking-tight">
            <span className="font-light">{site.wordmark[0]} </span>
            <span className="wide font-bold">{site.wordmark[1]}</span>
            <span className="mx-3 text-rule">/</span>
            <a
              href={sibling.url}
              className="text-carbon-soft underline decoration-rule underline-offset-4 hover:text-carbon hover:decoration-signal"
            >
              {sibling.name}
            </a>
          </p>
        </div>
        <div className="flex gap-5 text-sm text-carbon-soft">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-carbon"
          >
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-carbon">
            {site.email}
          </a>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
