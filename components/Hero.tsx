import { model } from "@/lib/content";
import { study, toolPolicy, regime, gate, corpus } from "@/lib/opengrad";

// Two results, one structure each: a headline number, a second number that
// complicates or reinforces it, and a way in. The panels are deliberately
// symmetrical — same type scale, same rhythm — so neither research track
// reads as the main event and the other as a footnote.
//
// The surface under them is the dark stage defined in globals.css. The whole
// point of the opening is contrast: a red bloom and a blueprint grid behind
// oversized tabular numerals, so the first screen states the results instead
// of laying them out like a memo.
type Panel = {
  eyebrow: string;
  subject: string;
  lead: { value: string; caption: string; detail: string };
  turn: { word: string; value: string; caption: string; detail: string };
  links: { label: string; href: string }[];
  alarm?: boolean;
};

const panels: Panel[] = [
  {
    eyebrow: `OpenGrad · ${study.id}`,
    subject: study.model,
    lead: {
      value: `+${toolPolicy.delta.toFixed(4)}`,
      caption: "call F1 on tool use",
      detail: `${toolPolicy.from.toFixed(4)} → ${toolPolicy.to.toFixed(4)} on held-out tool-use prompts, almost all of it from SFT (${toolPolicy.sft.toFixed(4)}), and over-calling fell from ${Math.round(toolPolicy.overCallFrom * 100)}% to ${Math.round(toolPolicy.overCallTo * 100)}%`,
    },
    turn: {
      word: "then",
      value: `${Math.round(regime.zeroShotRefusal * 100)}%`,
      caption: "of bare arithmetic questions refused",
      detail: `All ${regime.n.toLocaleString()} of them. The base model refused none.`,
    },
    links: [
      { label: `Read ${study.id}`, href: study.site },
      { label: "Audit", href: study.audit },
    ],
    alarm: true,
  },
  {
    eyebrow: "Visual-Qwen",
    subject: "Qwen3-4B + LoRA",
    lead: {
      value: "99.0%",
      caption: "sludge told from ordinary short-form video",
      detail:
        "On held-out clips, from a 2M-parameter projector and LoRA adapters trained on one H200.",
    },
    turn: {
      word: "and",
      value: "+10.0pp",
      caption: "of that comes from the audio",
      detail: "Vision alone reaches 89.0%. The Whisper transcript adds ten points.",
    },
    links: [
      { label: "Weights", href: model.artifacts[1].href },
      { label: "Code", href: model.artifacts[0].href },
    ],
  },
];

// The receipt for the first screen: what it took, and what it takes to check
// the work rather than believe it. Every figure is read from the same audited
// source the section below renders, so the band cannot drift from the claim.
const receipt = [
  { v: gate.perExampleRecords.toLocaleString(), k: "per-example records" },
  { v: `$${gate.cost.toFixed(2)}`, k: `across ${gate.gpuRuns} H200 runs` },
  { v: gate.answerExamples.toString(), k: "answering prompts in the gate" },
  { v: `${(corpus.refusalTargets / corpus.records * 100).toFixed(1)}%`, k: "of the corpus is a refusal" },
];

function Panel({ p }: { p: Panel }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-4 border-b border-ink-rule pb-3">
        <h2 className="eyebrow text-white">{p.eyebrow}</h2>
        <span className="text-sm text-ink-soft">{p.subject}</span>
      </div>

      <p className="wide mt-8 text-6xl font-bold leading-none tracking-tight tabular-nums sm:text-7xl">
        {p.lead.value}
      </p>
      <p className="mt-4 text-lg leading-7 text-white">{p.lead.caption}</p>
      <p className="mt-2 max-w-md leading-7 text-ink-soft">{p.lead.detail}</p>

      <p className="mt-9 flex items-center gap-3 text-sm text-ink-soft">
        <span className="h-px w-8 bg-signal" aria-hidden="true" />
        {p.turn.word}
      </p>

      <p
        className={`wide mt-3 text-6xl font-bold leading-none tracking-tight tabular-nums sm:text-7xl ${
          p.alarm ? "text-signal-soft" : "text-white"
        }`}
      >
        {p.turn.value}
      </p>
      <p className="mt-4 text-lg leading-7 text-white">{p.turn.caption}</p>
      <p className="mt-2 max-w-md leading-7 text-ink-soft">{p.turn.detail}</p>

      <ul className="mt-auto flex flex-wrap gap-3 pt-9 text-sm">
        {p.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-ink-rule px-4 py-2 font-medium text-white transition-colors hover:border-signal hover:bg-signal"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="stage scroll-mt-14 overflow-hidden border-b-2 border-signal text-white"
    >
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink-rule pb-4 text-ink-soft">
          <p className="eyebrow">Research log · Results and retractions</p>
          <p className="eyebrow">Weights, code and logs published</p>
        </div>

        <h1 className="display reveal mt-10 max-w-5xl text-white">
          Two results we can hand you the evidence for.
        </h1>
        <p className="reveal mt-6 max-w-2xl text-xl leading-8 text-ink-soft sm:text-2xl sm:leading-9">
          One is a model that works. The other is a model we improved, and
          broke, and only found out because we went looking.
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-16">
          {panels.map((p) => (
            <Panel key={p.eyebrow} p={p} />
          ))}
        </div>
      </div>

      {/* The receipt band. The only place on the first screen where the
          numbers are not a result but a cost. Each cell rules itself off at
          the top so the band keeps its meter-panel read at one, two and four
          columns alike. */}
      <div className="border-t border-ink-rule">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-7 px-6 py-10 sm:grid-cols-4">
          {receipt.map((r) => (
            <div key={r.k} className="border-t border-ink-rule pt-4">
              <dd className="wide text-3xl font-bold tabular-nums text-white">
                {r.v}
              </dd>
              <dt className="mt-2 text-sm leading-5 text-ink-soft">{r.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
