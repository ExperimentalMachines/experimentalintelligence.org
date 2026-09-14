import SludgeFrame from "@/components/SludgeFrame";
import SectionMarker from "@/components/SectionMarker";
import { model } from "@/lib/content";

export default function Model() {
  return (
    <section id="model" className="scroll-mt-14 border-t border-rule bg-plate">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 md:grid-cols-[18rem_1fr] md:gap-16">
        {/* The figure sits on its own shade rather than directly on the plate,
            so the drawing reads as an exhibit inside the section instead of
            as an illustration floating in the margin. */}
        <div className="reveal self-start border border-rule bg-shade p-5 md:sticky md:top-24">
          <SludgeFrame />
          <p className="eyebrow mt-5 text-carbon-soft">What the model sees</p>
        </div>

        <div>
          <SectionMarker n="02" label="Visual-Qwen · Model" />

          <h2 className="display-sm reveal mt-6">{model.name}</h2>
          <p className="reveal mt-6 max-w-xl text-xl leading-8">{model.claim}</p>
          <p className="reveal mt-4 max-w-xl leading-7 text-carbon-soft">
            {model.how}
          </p>
          <p className="reveal mt-3 max-w-xl leading-7 text-carbon-soft">
            {model.ablation}
          </p>

          <ol className="reveal mt-10 grid max-w-xl grid-cols-[1fr_auto_auto] gap-x-6 text-sm">
            {model.stack.map(([part, state, shape]) => (
              <li key={part} className="contents">
                <span className="border-t border-rule py-2.5 font-medium">
                  {part}
                </span>
                <span
                  className={`border-t border-rule py-2.5 ${
                    state === "trained" ? "text-signal" : "text-carbon-soft"
                  }`}
                >
                  {state}
                </span>
                <span className="border-t border-rule py-2.5 text-right tabular-nums text-carbon-soft">
                  {shape}
                </span>
              </li>
            ))}
          </ol>

          <ul className="reveal mt-10 flex flex-wrap gap-3 text-sm">
            {model.artifacts.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border border-rule px-4 py-2 font-medium text-carbon transition-colors hover:border-signal hover:text-signal"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
