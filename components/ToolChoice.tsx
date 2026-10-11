import Go from "@/components/Go";
import { card, h2, lede, link, ProjectLabel } from "@/components/ui";
import { toolChoice } from "@/lib/content";

const families = [...new Set(toolChoice.arms.map((a) => a.family))];

export default function ToolChoice() {
  return (
    <section id="tool-choice" className="scroll-mt-28 bg-bench lg:scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <ProjectLabel name="Tool-choice contrast" status="In development, nothing measured yet" pending />
            <h2 className={`${h2} mt-6`}>Same question, different tools.</h2>
          </div>
          <p className={`${lede} max-w-xl`}>
            A test set built for the gap OpenGrad found. Each question is asked three times, word for word, with
            different tools on offer. In one family the right response is always a direct answer; in the other it
            changes with the tools while the question does not.
          </p>
        </div>

        <figure className={`${card} mt-12 bg-white`}>
          <div className="grid gap-8 md:grid-cols-2">
            {families.map((f) => (
              <div key={f}>
                <p className="text-sm font-medium">{f}</p>
                <p className="mt-1 text-sm text-ink-soft">One question, unchanged, asked with</p>
                <ul className="mt-3 divide-y divide-rule border-y border-rule">
                  {toolChoice.arms
                    .filter((a) => a.family === f)
                    .map((a) => (
                      <li key={a.tools} className="flex items-center justify-between gap-4 py-3 text-sm">
                        <span className="text-ink-soft">{a.tools}</span>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                            a.gold === "Answer" ? "bg-violet text-white" : "bg-lavender/60 text-violet-deep"
                          }`}
                        >
                          {a.gold}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <figcaption className="mt-6 text-sm leading-6 text-ink-soft">
            The correct response to each version. Planned: {toolChoice.items} items over {toolChoice.stems} questions.
            Code under Apache-2.0, the questions under CC-BY-4.0.{" "}
            <Go href={toolChoice.rubric} className={link}>
              The rubric
            </Go>{" "}
            <Go href={toolChoice.repo} className={`${link} ml-3`}>
              <span className="sr-only">Tool-choice contrast </span>Source
            </Go>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
