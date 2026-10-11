import RunChart from "@/components/RunChart";
import { card, h2, lede, ProjectLabel } from "@/components/ui";
import { run } from "@/lib/content";
import { evals } from "@/lib/run";

export default function FromScratch() {
  return (
    <section id="from-scratch" className="scroll-mt-28 lg:scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <ProjectLabel name="From scratch" status="Run complete" />
            <h2 className={`${h2} mt-6`}>A {run.params} model, trained from scratch.</h2>
          </div>
          <p className={`${lede} max-w-xl`}>
            Five stages, applied end to end to one small model on {run.gpu}: pretraining and midtraining on about{" "}
            {run.tokens} tokens, then SFT, DPO and GRPO, in {run.hours} hours of training. The training code is not
            public yet.
          </p>
        </div>

        <div className={`${card} mt-12 border border-rule`}>
          <RunChart />
        </div>

        <div className={`${card} mt-6 grid gap-8 bg-bench lg:grid-cols-[1.4fr_1fr] lg:gap-16`}>
          <div className="min-w-0">
            <p className="mb-3 text-sm text-ink-soft sm:hidden">Scroll the table sideways for every benchmark.</p>
            <div
              role="region"
              aria-label="Benchmarks after each stage, scrolls sideways"
              tabIndex={0}
              className="min-w-0 overflow-x-auto"
            >
              <table className="w-full min-w-[30rem] border-collapse text-sm">
                <caption className="pb-4 text-left font-medium">Benchmarks after each stage</caption>
                <thead className="text-left text-ink-soft">
                  <tr className="border-b border-ink">
                    <th className="py-2.5 pr-3 font-normal">After</th>
                    <th className="py-2.5 pr-3 text-right font-normal">Perplexity</th>
                    <th className="py-2.5 pr-3 text-right font-normal">HellaSwag</th>
                    <th className="py-2.5 pr-3 text-right font-normal">ARC-e</th>
                    <th className="py-2.5 pr-3 text-right font-normal">MMLU</th>
                    <th className="py-2.5 text-right font-normal">GSM8K</th>
                  </tr>
                </thead>
                <tbody>
                  {evals.map((e) => (
                    <tr key={e.stage} className="border-b border-rule">
                      <td className="py-3 pr-3 font-medium">{e.stage}</td>
                      <td className="py-3 pr-3 text-right tabular-nums">{e.ppl.toFixed(2)}</td>
                      <td className="py-3 pr-3 text-right tabular-nums">{e.hellaswag.toFixed(1)}%</td>
                      <td className="py-3 pr-3 text-right tabular-nums">{e.arc.toFixed(1)}%</td>
                      <td className="py-3 pr-3 text-right tabular-nums">{e.mmlu.toFixed(1)}%</td>
                      <td className="py-3 text-right tabular-nums">{e.gsm8k.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-sm leading-6 text-ink-soft">
            <p>
              The multiple-choice differences between stages are within noise: HellaSwag and MMLU were scored on 1,000
              questions each, ARC-e on 570 and GSM8K on 200. Perplexity rises at SFT because it is measured on web text
              while the model is being trained for dialogue.
            </p>
            <p className="mt-4">
              What changed was behaviour. Midtraining taught the GSM8K answer format, SFT lost it, and GRPO brought it
              back. After GRPO 3 of 200 answers were correct, against 2 after SFT, with DPO between.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
