import SludgeFrame from "@/components/SludgeFrame";
import { model } from "@/lib/content";

export default function Model() {
  return (
    <section id="model" className="scroll-mt-14 border-t border-rule bg-plate">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-20 md:grid-cols-[18rem_1fr] md:gap-16">
        <SludgeFrame />
        <div>
          <h2 className="wide text-4xl font-bold tracking-tight sm:text-5xl">
            {model.name}
          </h2>
          <p className="mt-4 max-w-xl text-xl leading-8">{model.claim}</p>
          <p className="mt-4 max-w-xl leading-7 text-carbon-soft">{model.how}</p>
          <p className="mt-3 max-w-xl leading-7 text-carbon-soft">
            {model.ablation}
          </p>
          <ol className="mt-8 grid max-w-xl grid-cols-[1fr_auto_auto] gap-x-6 text-sm">
            {model.stack.map(([part, state, shape]) => (
              <li key={part} className="contents">
                <span className="border-t border-rule py-2 font-medium">{part}</span>
                <span className={`border-t border-rule py-2 ${state === "trained" ? "text-signal" : "text-carbon-soft"}`}>
                  {state}
                </span>
                <span className="border-t border-rule py-2 text-right tabular-nums text-carbon-soft">
                  {shape}
                </span>
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {model.artifacts.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
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
