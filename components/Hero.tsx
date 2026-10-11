import { BarRows } from "@/components/Bars";
import { projects, run } from "@/lib/content";
import { bare, toolPolicy } from "@/lib/opengrad";

type Measure = {
  name: string;
  n: string;
  max: number;
  before: [string, number, string];
  after: [string, number, string];
};

// One result: two measurements, each a before/after pair on its own scale and
// with its own denominator, so unrelated metrics never share an axis.
function Result({ project, title, measures }: { project: string; title: string; measures: Measure[] }) {
  return (
    <figure className="flex flex-col rounded-[1.5rem] bg-white p-5 text-ink sm:p-6">
      <p className="text-xs font-medium text-violet-deep">{project}</p>
      <figcaption className="display mt-2 text-lg leading-snug">{title}</figcaption>
      <div className="mt-5 space-y-5">
        {measures.map((m) => (
          <div key={m.name}>
            <p className="text-sm font-medium">{m.name}</p>
            <p className="mb-2.5 text-xs text-ink-soft">{m.n}</p>
            <BarRows
              max={m.max}
              labelWidth="5.25rem"
              valueWidth="4rem"
              rows={[
                { label: m.before[0], value: m.before[1], shown: m.before[2], muted: true },
                { label: m.after[0], value: m.after[1], shown: m.after[2], strong: true },
              ]}
            />
          </div>
        ))}
      </div>
    </figure>
  );
}

export default function Hero() {
  return (
    <>
      <section id="top" className="on-violet overflow-hidden bg-violet text-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
          <p
            aria-hidden
            className="display whitespace-nowrap text-[calc((100vw-40px)/5.3)] font-semibold leading-[0.9] tracking-[-0.055em] sm:text-[min(calc((100vw-64px)/10.2),120px)]"
          >
            {/* Sized so the wordmark spans the content width: two lines on phones, one above. */}
            <span className="block sm:inline">Experimental</span> <span className="block sm:inline">Intelligence</span>
          </p>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="lg:order-2">
              <h1 className="display text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Small models, measured in the open.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
                We train and post-train small open models and publish what each step changes, including what gets worse.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-white px-6 py-3 text-base font-medium text-violet-deep hover:bg-white/90"
                >
                  See the research
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/40 px-6 py-3 text-base font-medium text-white hover:border-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <Result
                  project="OpenGrad · Qwen3.5-2B"
                  title="Tool-call F1 rose. Bare maths questions went unanswered."
                  measures={[
                    {
                      name: "Tool-call F1",
                      n: "1,277 held-out tool-use prompts",
                      max: 1,
                      before: ["Base", toolPolicy.from, toolPolicy.from.toFixed(2)],
                      after: ["Post-trained", toolPolicy.to, toolPolicy.to.toFixed(2)],
                    },
                    {
                      name: "GSM8K solved",
                      n: `${bare.n.toLocaleString("en-US")} questions, asked without worked examples`,
                      max: 100,
                      before: ["Base", bare.baseSolved, `${bare.baseSolved}%`],
                      after: ["Post-trained", bare.promotedSolved, `${bare.promotedSolved.toFixed(0)}%`],
                    },
                  ]}
                />
                <Result
                  project="From scratch · 151M"
                  title="GRPO taught the answer format, not the maths."
                  measures={[
                    {
                      name: "GSM8K answer format",
                      n: "200 questions, after SFT and after GRPO, with DPO between",
                      max: 100,
                      before: ["After SFT", run.grpo.formatFrom, `${run.grpo.formatFrom}%`],
                      after: ["After GRPO", run.grpo.formatTo, `${run.grpo.formatTo}%`],
                    },
                    {
                      name: "GSM8K solved",
                      n: "The same 200 questions",
                      max: 100,
                      before: ["After SFT", run.grpo.solvedFrom / 2, `${run.grpo.solvedFrom} of 200`],
                      after: ["After GRPO", run.grpo.solvedTo / 2, `${run.grpo.solvedTo} of 200`],
                    },
                  ]}
                />
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/85">
                In both, the number the training aimed at rose and the one beside it did not follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" aria-label="Projects" className="scroll-mt-28 lg:scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul className="grid gap-x-8 gap-y-8 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
            {projects.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="group block border-t-2 border-violet pt-4">
                  <span className="flex items-center justify-between gap-3">
                    <span className="display text-xl group-hover:text-violet-deep">{p.name}</span>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs text-ink-soft ${
                        p.id === "tool-choice" ? "border-dashed border-ink/30" : "border-rule"
                      }`}
                    >
                      {p.status}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-ink-soft">{p.line}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
