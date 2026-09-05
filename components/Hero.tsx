import RunChart from "@/components/RunChart";
import { evals } from "@/lib/run";
import { run, site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-14">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <h1 className="wide max-w-4xl text-[2.6rem] font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          Experimental models, trained end to end in the open.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-carbon-soft">
          {site.description}
        </p>
      </div>
      <div id="run" className="mx-auto max-w-6xl scroll-mt-14 px-6 pb-16 pt-14">
        <h2 className="wide text-3xl font-bold tracking-tight sm:text-4xl">
          {`${run.params} parameters. Five stages. 13.7\u00a0hours.`}
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-7 text-carbon-soft">
          One small language model, taken through pretraining, midtraining,
          SFT, DPO and GRPO on a single H100. The whole run, unedited.
        </p>
        <div className="mt-8">
          <RunChart />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_22rem] md:gap-16">
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
                <tr key={e.stage} className="border-b border-rule">
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
