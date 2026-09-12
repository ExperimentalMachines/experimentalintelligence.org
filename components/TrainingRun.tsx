import RunChart from "@/components/RunChart";
import { evals } from "@/lib/run";
import { run } from "@/lib/content";

// Previously the hero. The content is unchanged; it now sits as a section of
// its own so the two headline results can open the page together.
export default function TrainingRun() {
  return (
    <section id="run" className="scroll-mt-14 border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <h2 className="wide max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {`Training run for a ${run.params}-parameter model on ${run.gpu}, ${run.hours}.`}
        </h2>
        <div className="mt-10">
          <RunChart />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_22rem] md:gap-16">
          {/* Carries the named view timeline the row animation reads. It sits on
              this wrapper rather than the table so the timeline subject is an
              ordinary block box. */}
          <div className="run-table-wrap">
          <table className="w-full border-collapse text-sm">
            <thead className="text-left text-carbon-soft">
              <tr className="border-b border-rule">
                <th className="py-2 pr-3 font-normal">After</th>
                <th className="hidden py-2 pr-3 font-normal sm:table-cell">The model</th>
                <th className="py-2 pr-3 text-right font-normal">val ppl</th>
                <th className="py-2 pr-3 text-right font-normal">HellaSwag</th>
                <th className="py-2 pr-3 text-right font-normal">ARC-e</th>
                <th className="py-2 pr-3 text-right font-normal">MMLU</th>
                <th className="py-2 text-right font-normal">GSM8K</th>
              </tr>
            </thead>
            <tbody>
              {evals.map((e) => (
                <tr key={e.stage} className="run-row border-b border-rule">
                  <td className="py-2.5 pr-3 font-medium">{e.stage}</td>
                  <td className="hidden py-2.5 pr-3 text-carbon-soft sm:table-cell">{e.adds}</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{e.ppl.toFixed(2)}</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{e.hellaswag.toFixed(1)}%</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{e.arc.toFixed(1)}%</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{e.mmlu.toFixed(1)}%</td>
                  <td className="py-2.5 text-right tabular-nums">{e.gsm8k.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <p className="leading-7 text-carbon-soft">{run.note}</p>
            <p className="mt-4 text-sm text-carbon-soft">
              {run.tokens} tokens on {run.gpu}. Every objective is plain PyTorch.
            </p>
            <a
              href={run.code}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
            >
              Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
