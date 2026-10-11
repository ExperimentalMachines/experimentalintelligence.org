import CapabilityChart from "@/components/CapabilityChart";
import Go from "@/components/Go";
import { card, h2, lede, link, ProjectLabel } from "@/components/ui";
import { sibling } from "@/lib/content";
import { canonical, canonicalSources } from "@/lib/datasets";
import { cost, heldOut, ladder, study } from "@/lib/opengrad";

const heldOutMax = Math.max(...heldOut.map((h) => h.n));
const sourceMax = Math.max(...canonicalSources.map((s) => s.canonical));

export default function OpenGrad() {
  return (
    <section id="opengrad" className="scroll-mt-28 lg:scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <ProjectLabel name="OpenGrad" status="Study 001 published" />
            <h2 className={`${h2} mt-6`}>What tool-use training cost a 2B model.</h2>
          </div>
          <p className={`${lede} max-w-xl`}>
            OpenGrad post-trains {study.model} to decide when to call a tool, then measures what else changed. The
            checkpoint we promoted calls tools better and does worse on general benchmarks than the model it started
            from. Finding that cost ${cost.total.toFixed(2)} of GPU time.
          </p>
        </div>

        <div className={`${card} mt-12 bg-bench`}>
          <p className="text-sm font-medium">General ability, before and after tool-use training</p>
          <div className="mt-8">
            <CapabilityChart />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-soft">
            Upstream benchmarks and scorers, one engine configuration for every stage. On the bottom two rows the model
            refuses nothing, so those drops are lost ability rather than refusals. Two gaps carry a caveat about the
            token limit. On IFEval, 47 base and 67 SFT answers of 541 hit it, and no interval was computed. The MMLU-Pro
            gap is a point estimate that lies between 6.4 and 33.1 points depending on how its truncated answers
            resolve. DPO on top of SFT changed every score by under one point.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <figure className={`${card} border border-rule`}>
            <p className="text-sm font-medium">Why the promotion gate missed it</p>
            <p className="mt-1 text-sm text-ink-soft">What the 1,277 held-out examples asked the model to do</p>
            <ul className="mt-6 space-y-2.5">
              {heldOut.map((h) => (
                <li key={h.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm">
                  <span className={h.n ? "text-ink-soft" : "font-medium"}>{h.label}</span>
                  {h.n ? (
                    <span className="block h-2.5">
                      <span
                        className="block h-full rounded-full bg-mist"
                        style={{ width: `${(h.n / heldOutMax) * 100}%` }}
                      />
                    </span>
                  ) : (
                    <span className="font-medium text-violet-deep">No examples</span>
                  )}
                  <span className={`tabular-nums ${h.n ? "text-ink-soft" : "font-medium text-violet-deep"}`}>
                    {h.n}
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="mt-5 text-sm leading-6 text-ink-soft">
              With no examples that ask for a direct answer, the gate could not see a model that stopped answering.
              Study 002 sets out to explain the refusals before trying to fix them; it has no trained model yet.
            </figcaption>
          </figure>

          <figure className={`${card} border border-rule`}>
            <p className="text-sm font-medium">Compressed for llama.cpp: nine sizes, two pass the main gate</p>
            <p className="mt-1 text-sm text-ink-soft">
              Tool-use decisions unchanged from the uncompressed model on llama.cpp
            </p>
            <ul className="mt-6 space-y-1.5">
              {ladder.map((q) => (
                <li
                  key={q.format}
                  className="grid grid-cols-[3.75rem_4.25rem_minmax(0,1fr)_3.25rem] items-center gap-2 text-sm sm:grid-cols-[4.5rem_4.5rem_minmax(0,1fr)_3.5rem] sm:gap-3"
                >
                  <span className={q.passes ? "font-medium" : "text-ink-soft"}>{q.format}</span>
                  <span className="tabular-nums text-ink-soft">{q.gib.toFixed(2)} GiB</span>
                  <span className="block h-2.5">
                    <span
                      className={`block h-full rounded-full ${q.passes ? "bg-violet" : "bg-mist"}`}
                      style={{ width: `${q.agreement}%` }}
                    />
                  </span>
                  <span className={`tabular-nums ${q.passes ? "font-medium" : "text-ink-soft"}`}>
                    {q.agreement.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden className="h-2.5 w-6 rounded-full bg-violet" /> Passes the main gate
            </p>
            <figcaption className="mt-3 text-sm leading-6 text-ink-soft">
              Each GGUF scored on the same 1,277 examples against gates fixed before any format existed. Q6_K is the
              smallest that passes the main gate; no format met the stricter release bar. llama.cpp is one of the
              engines in{" "}
              <Go href={sibling.openweights} className={link}>
                OpenWeights
              </Go>
              , the {sibling.name} app OpenGrad grew out of.
            </figcaption>
          </figure>
        </div>

        <div className={`${card} mt-6 grid gap-8 bg-bench lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <div>
            <p className="text-sm font-medium">The training data</p>
            <p className="display mt-3 text-2xl leading-tight">{canonical.name}</p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              {canonical.facts[0][1]} records from four public function-calling datasets, mapped to one schema. Each
              record keeps its source and licence, so attribution travels with the row. It carries no single licence:
              its sources use two.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-base">
              <Go href={study.site} className={link}>
                Read {study.id}
              </Go>
              <Go href={study.audit} className={link}>
                The audit
              </Go>
              <Go href={study.weights} className={link}>
                Weights
              </Go>
              <Go href={study.gguf} className={link}>
                GGUF builds
              </Go>
              <Go href={canonical.href} className={link}>
                Dataset
              </Go>
              <Go href={study.repo} className={link}>
                <span className="sr-only">OpenGrad </span>Source
              </Go>
            </p>
          </div>
          <figure>
            <ul className="space-y-4">
              {canonicalSources.map((s) => (
                <li key={s.repo} className="text-sm">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <Go href={s.href} className="font-medium hover:text-violet-deep">
                      {s.repo.split("/")[1]}
                    </Go>
                    <span className="text-ink-soft">{s.license}</span>
                  </span>
                  <span className="mt-1.5 grid grid-cols-[minmax(0,1fr)_4rem] items-center gap-3">
                    <span className="block h-2.5">
                      <span
                        className="block h-full rounded-full bg-violet"
                        style={{ width: `${(s.canonical / sourceMax) * 100}%` }}
                      />
                    </span>
                    <span className="tabular-nums text-ink-soft">{s.canonical.toLocaleString("en-US")}</span>
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="mt-4 text-sm leading-6 text-ink-soft">Records each source contributed.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
