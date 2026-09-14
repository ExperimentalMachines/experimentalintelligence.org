import SectionMarker from "@/components/SectionMarker";
import { further } from "@/lib/content";
import {
  canonical,
  canonicalSources,
  excludedSources,
  licenseHref,
  sludge,
} from "@/lib/datasets";

// Two datasets, each stated the same way: what it is, what it counts, and
// where every row came from. The licence column is not decoration — the
// canonical corpus is a union of four sources under two different licences,
// so the table is the only honest place to put it.

const num = (n: number) => n.toLocaleString();

function LicenseLink({
  id,
  tone = "light",
}: {
  id: Parameters<typeof licenseHref>[0];
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={licenseHref(id)}
      target="_blank"
      rel="noreferrer"
      className={`underline decoration-dotted underline-offset-4 ${
        tone === "dark"
          ? "text-signal-soft hover:text-white"
          : "text-signal hover:text-signal-deep"
      }`}
    >
      {id}
    </a>
  );
}

export default function Dataset() {
  const refusalTotal = canonicalSources.reduce((a, s) => a + s.refusals, 0);

  return (
    <section id="dataset" className="scroll-mt-14 border-t border-rule bg-plate">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <SectionMarker n="04" label="Datasets" />

        <h2 className="display-sm reveal mt-6 max-w-4xl">
          Everything we trained on, and the terms we took it under.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-xl leading-8">
          One corpus built from other people&apos;s function-calling data, and
          one we collected ourselves. Both are published, both are accounted for
          source by source, and neither licence is summarised into something
          tidier than it is.
        </p>

        {/* ── Canonical v2 ─────────────────────────────────────────────── */}
        <article className="mt-16 border-t-2 border-carbon pt-8">
          <div className="grid gap-8 md:grid-cols-[1fr_20rem] md:gap-16">
            <div>
              <div className="reveal flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="wide text-3xl font-bold tracking-tight">
                  {canonical.name}
                </h3>
                <span className="border border-rule px-2 py-0.5 text-xs text-carbon-soft">
                  OpenGrad · Study 001
                </span>
              </div>
              <p className="reveal mt-4 max-w-2xl leading-7 text-carbon-soft">
                {canonical.summary}
              </p>
            </div>

            <dl className="reveal grid grid-cols-2 gap-px self-start bg-rule">
              {canonical.facts.map(([k, v]) => (
                <div key={k} className="bg-plate p-4">
                  <dd className="wide text-2xl font-bold tabular-nums">{v}</dd>
                  <dt className="mt-1 text-sm text-carbon-soft">{k}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Provenance. Every row is a source that is actually in the
              release, at the count the release manifest records for it. */}
          <h4 className="eyebrow reveal mt-14 text-carbon-soft">
            Where the records came from
          </h4>

          <div className="reveal mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Upstream sources of the OpenGrad ToolPolicy Canonical v2 corpus,
                with the licence read from each source, the rows each
                contributed, and the refusal targets each supplied.
              </caption>
              <thead className="text-left text-carbon-soft">
                <tr className="border-b border-carbon">
                  <th className="py-2.5 pr-3 font-normal">Upstream source</th>
                  <th className="py-2.5 pr-3 font-normal">Licence</th>
                  <th className="hidden py-2.5 pr-3 text-right font-normal md:table-cell">
                    Upstream rows
                  </th>
                  <th className="py-2.5 pr-3 text-right font-normal">
                    In corpus
                  </th>
                  <th className="hidden py-2.5 pr-3 text-right font-normal sm:table-cell">
                    Trainable
                  </th>
                  <th className="py-2.5 text-right font-normal">
                    Refusal targets
                  </th>
                </tr>
              </thead>
              <tbody>
                {canonicalSources.map((s) => (
                  <tr key={s.repo} className="border-b border-rule align-top">
                    <td className="py-3 pr-3">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-carbon underline decoration-rule underline-offset-4 hover:decoration-signal"
                      >
                        {s.repo}
                      </a>
                      <span className="mt-1 block max-w-md text-carbon-soft">
                        {s.role}
                      </span>
                      {s.caveat && (
                        <span className="mt-2 block max-w-md text-xs leading-5 text-carbon-soft">
                          {s.caveat}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <LicenseLink id={s.license} />
                    </td>
                    <td className="hidden py-3 pr-3 text-right tabular-nums text-carbon-soft md:table-cell">
                      {s.upstream}
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums">
                      {num(s.canonical)}
                    </td>
                    <td className="hidden py-3 pr-3 text-right tabular-nums text-carbon-soft sm:table-cell">
                      {num(s.trainable)}
                    </td>
                    <td
                      className={`py-3 text-right tabular-nums ${
                        s.refusals > 0 ? "font-medium text-signal" : "text-carbon-soft"
                      }`}
                    >
                      {num(s.refusals)}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-carbon">
                  <td className="py-3 pr-3 font-medium">Total</td>
                  <td className="py-3 pr-3 text-carbon-soft">
                    composite, per source
                  </td>
                  <td className="hidden py-3 pr-3 text-right tabular-nums text-carbon-soft md:table-cell">
                    198,630
                  </td>
                  <td className="py-3 pr-3 text-right font-medium tabular-nums">
                    {num(canonicalSources.reduce((a, s) => a + s.canonical, 0))}
                  </td>
                  <td className="hidden py-3 pr-3 text-right font-medium tabular-nums sm:table-cell">
                    {num(canonicalSources.reduce((a, s) => a + s.trainable, 0))}
                  </td>
                  <td className="py-3 text-right font-medium tabular-nums text-signal">
                    {num(refusalTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="reveal mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
            <div className="md:col-span-2">
              <p className="leading-7 text-carbon-soft">
                The corpus carries{" "}
                <span className="text-carbon">no single licence</span>, because
                it is a union of four sources under two of them. Each record
                keeps{" "}
                {canonical.carries.map((f, i) => (
                  <span key={f}>
                    {i > 0 && (i === canonical.carries.length - 1 ? " and " : ", ")}
                    <code className="text-carbon">{f}</code>
                  </span>
                ))}
                , so the attribution travels with the row instead of stopping at
                the download page. Nothing was excluded from this release
                because of its licence: the two sources that dropped out of v1
                did so for access, not terms.
              </p>
              <p className="mt-4 leading-7 text-carbon-soft">
                The refusal column is the reason this table exists.{" "}
                <span className="text-carbon">
                  22.3% of the refusal targets come from When2Call
                </span>
                , which is 3.8% of the corpus, and 77.7% from Glaive. xLAM —
                a third of the corpus — contributes none. Counted by a
                heuristic regex whose precision has not been measured, which is
                the same caveat the finding above carries.
              </p>
            </div>

            <dl className="self-start border border-rule bg-lab p-5">
              <dt className="eyebrow text-carbon-soft">Supervision contract</dt>
              {canonical.contracts.map(([k, v, share]) => (
                <div key={k} className="mt-4">
                  <dd className="wide text-2xl font-bold tabular-nums">{v}</dd>
                  <dt className="text-sm text-carbon-soft">
                    {k} · {share}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* The fingerprint is published so the page can be checked, not
              just read: re-hash the manifest and this string should match. */}
          <div className="reveal mt-10 border border-rule bg-lab p-5">
            <p className="eyebrow text-carbon-soft">Release fingerprint</p>
            <p className="mt-3 break-all font-mono text-xs leading-5 text-carbon">
              {canonical.fingerprint}
            </p>
            <p className="mt-2 text-sm text-carbon-soft">
              {canonical.fingerprintNote} Schema{" "}
              <code className="text-carbon">{canonical.schema}</code>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a
                href={canonical.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-carbon px-4 py-2 font-medium text-white transition-colors hover:bg-signal"
              >
                Download on Hugging Face
              </a>
            </div>
          </div>

          {/* What was registered and left out. Present because it is the same
              class of fact as what went in. */}
          <div className="reveal mt-10 border-t border-rule pt-6">
            <h4 className="eyebrow text-carbon-soft">
              Registered and not included
            </h4>
            <ul className="mt-4 space-y-4">
              {excludedSources.map((s) => (
                <li
                  key={s.repo}
                  className="grid gap-1 sm:grid-cols-[19rem_1fr] sm:gap-6"
                >
                  <span className="text-sm">
                    <span className="font-medium">{s.repo}</span>
                    <span className="block text-carbon-soft">
                      <LicenseLink id={s.license} />
                    </span>
                  </span>
                  <span className="max-w-2xl text-sm leading-6 text-carbon-soft">
                    {s.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* ── Sludge ───────────────────────────────────────────────────── */}
        <article className="mt-20 border-t-2 border-carbon pt-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <div>
              <div className="reveal flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="wide text-3xl font-bold tracking-tight">
                  {sludge.name}
                </h3>
                <span className="border border-rule px-2 py-0.5 text-xs text-carbon-soft">
                  Visual-Qwen
                </span>
              </div>
              <p className="reveal mt-4 max-w-2xl leading-7 text-carbon-soft">
                {sludge.summary}
              </p>
              <p className="reveal mt-4 max-w-2xl leading-7 text-carbon-soft">
                {sludge.provenance}
              </p>
              <p className="reveal mt-5 text-sm">
                <span className="text-carbon-soft">Licence </span>
                <LicenseLink id={sludge.license} />
                <span className="text-carbon-soft">
                  {" "}
                  — research use only, inherited from the videos.
                </span>
              </p>
              <a
                href={sludge.href}
                target="_blank"
                rel="noreferrer"
                className="reveal mt-6 inline-block bg-carbon px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-signal"
              >
                Download on Kaggle
              </a>
            </div>

            <div className="reveal">
              <dl className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3">
                {sludge.facts.map(([k, v]) => (
                  <div key={k} className="bg-plate p-4">
                    <dd className="wide text-2xl font-bold tabular-nums">{v}</dd>
                    <dt className="mt-1 text-sm text-carbon-soft">{k}</dt>
                  </div>
                ))}
              </dl>
              <dl className="mt-6 border-t border-rule">
                {sludge.platforms.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-rule py-2 text-sm"
                  >
                    <dt className="text-carbon-soft">{k}</dt>
                    <dd className="tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </article>

        {/* ── Further work ─────────────────────────────────────────────── */}
        <h3 className="eyebrow reveal mt-20 border-t border-rule pt-8 text-carbon-soft">
          Also published, or next
        </h3>
        <ul className="reveal mt-2">
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
              <span className="text-sm text-carbon-soft sm:text-right">
                {f.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
