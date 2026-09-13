import { model } from "@/lib/content";
import { study, toolPolicy, regime } from "@/lib/opengrad";

// Two results, one structure each: a headline number, a second number that
// complicates or reinforces it, and a way in. The panels are deliberately
// symmetrical — same type scale, same rhythm — so neither research track
// reads as the main event and the other as a footnote.
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
      detail: "On held-out clips, from a 2M-parameter projector and LoRA adapters trained on one H200.",
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

function Panel({ p }: { p: Panel }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-4 border-b border-carbon pb-3">
        <h2 className="wide text-sm font-bold tracking-tight">{p.eyebrow}</h2>
        <span className="text-sm text-carbon-soft">{p.subject}</span>
      </div>

      <p className="wide mt-7 text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl">
        {p.lead.value}
      </p>
      <p className="mt-3 text-lg leading-7">{p.lead.caption}</p>
      <p className="mt-2 max-w-md leading-7 text-carbon-soft">{p.lead.detail}</p>

      <p className="mt-8 flex items-center gap-3 text-sm text-carbon-soft">
        <span className="h-px w-8 bg-rule" aria-hidden="true" />
        {p.turn.word}
      </p>

      <p
        className={`wide mt-3 text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl ${
          p.alarm ? "text-signal" : "text-carbon"
        }`}
      >
        {p.turn.value}
      </p>
      <p className="mt-3 text-lg leading-7">{p.turn.caption}</p>
      <p className="mt-2 max-w-md leading-7 text-carbon-soft">{p.turn.detail}</p>

      <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 text-sm">
        {p.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
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
    <section id="top" className="scroll-mt-14 border-b border-rule bg-plate">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pt-16">
        <p className="max-w-3xl text-xl leading-8 sm:text-2xl sm:leading-9">
          Two results we can hand you the evidence for.
          <span className="text-carbon-soft">
            {" "}
            One is a model that works. The other is a model we improved, and
            broke, and only found out because we went looking.
          </span>
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {panels.map((p) => (
            <Panel key={p.eyebrow} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
