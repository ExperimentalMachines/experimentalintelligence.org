import CapabilityChart from "@/components/CapabilityChart";
import SectionMarker from "@/components/SectionMarker";
import { corpus, gate, ladder, regime, study } from "@/lib/opengrad";

const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;

export default function OpenGrad() {
  return (
    <section id="study" className="scroll-mt-14 border-t border-rule bg-lab">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <SectionMarker n="01" label={`OpenGrad · ${study.id} · ${study.model}`} />

        <h2 className="display-sm reveal mt-6 max-w-4xl">
          We improved the metric we were optimising. Then the model stopped
          answering questions.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-xl leading-8">
          A checkpoint was promoted on tool use, under a gate revised after its
          SFT parent had been evaluated. It was also materially worse than the
          model it started from, and the gate could not see it.
        </p>

        {/* The chart is the only figure in the page that carries the finding,
            so it gets the same plate treatment as the training curves: a white
            card on the grey, which also stops the two figures from competing
            with the section they sit in. */}
        <div className="reveal mt-14 border border-rule bg-plate p-5 sm:p-7">
          <CapabilityChart />
        </div>

        {/* The ladder. Both columns for the same three checkpoints, so the
            trade is legible in one place rather than argued in prose. */}
        <div className="mt-20 grid gap-10 md:grid-cols-[1fr_20rem] md:gap-16">
          <div className="reveal overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Tool-policy score and general capability for each checkpoint.
            </caption>
            <thead className="text-left text-carbon-soft">
              <tr className="border-b border-carbon">
                <th className="py-2.5 pr-3 font-normal">Checkpoint</th>
                <th className="py-2.5 pr-3 text-right font-normal">call F1</th>
                <th className="py-2.5 pr-3 text-right font-normal">IFEval</th>
                <th className="py-2.5 pr-3 text-right font-normal">MMLU-Pro</th>
                <th className="py-2.5 pr-3 text-right font-normal">GSM8K 8-shot</th>
                <th className="py-2.5 text-right font-normal">refuses 0-shot</th>
              </tr>
            </thead>
            <tbody>
              {ladder.map((s) => (
                <tr key={s.stage} className="border-b border-rule">
                  <td className="py-3 pr-3">
                    <span className="font-medium">{s.stage}</span>
                    <span className="block text-carbon-soft">{s.note}</span>
                  </td>
                  <td className="py-3 pr-3 text-right tabular-nums">
                    {s.callF1.toFixed(4)}
                  </td>
                  <td className="py-3 pr-3 text-right tabular-nums">
                    {pct(s.ifeval)}
                  </td>
                  <td className="py-3 pr-3 text-right tabular-nums">
                    {pct(s.mmlu)}
                  </td>
                  <td className="py-3 pr-3 text-right tabular-nums">
                    {pct(s.gsmFew)}
                  </td>
                  <td
                    className={`py-3 text-right tabular-nums ${
                      s.gsmZeroRefusal > 0 ? "font-medium text-signal" : ""
                    }`}
                  >
                    {pct(s.gsmZeroRefusal, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="reveal">
            <p className="leading-7 text-carbon-soft">
              The win was real, and it is the leftmost column. Everything else
              moved the wrong way. In this lineage the regression first appears
              at supervised fine-tuning, and DPO on top changed little:{" "}
              {pct(gate.byteIdenticalDpo, 0)} of its GSM8K outputs are
              byte-identical to the checkpoint before it. But DPO applied directly
              to the base model, with no SFT, also refuses 70.7% of the same
              questions, so the regression goes with tool-policy post-training on
              this data, not with SFT alone.
            </p>
            <a
              href={study.site}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
            >
              Read {study.id}
            </a>
          </div>
        </div>

        {/* The regime contrast. This is the single measurement that stops the
            finding from collapsing into "it just refuses" or "it just forgot". */}
        <div className="mt-20 border-t border-carbon pt-12">
          <div className="grid gap-6 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16">
            <h3 className="display-sm reveal text-2xl sm:text-3xl">
              Refusal and capability are two different failures.
            </h3>
            <p className="reveal max-w-2xl leading-7 text-carbon-soft">
              The same {regime.n.toLocaleString()} questions, twice. Asked bare,
              the promoted checkpoint refuses every one. Put eight worked
              examples in front of the identical question and it refuses none —
              and still lands below where the base model starts. The ability is
              not gone, and it is not intact either. Both had to be measured
              separately to know that.
            </p>
          </div>

          <dl className="reveal mt-10 grid grid-cols-2 gap-px bg-rule sm:grid-cols-4">
            {[
              { k: "asked bare", v: pct(regime.zeroShotRefusal, 0), s: "refused", alarm: true },
              { k: "with 8 examples", v: pct(regime.fewShotRefusal, 0), s: "refused" },
              { k: "with 8 examples", v: pct(regime.fewShotSolved), s: "solved" },
              { k: "base, asked bare", v: pct(regime.baseZeroShotSolved), s: "solved" },
            ].map((c, i) => (
              <div key={i} className="bg-lab p-5">
                <dd
                  className={`wide text-4xl font-bold tabular-nums ${
                    c.alarm ? "text-signal" : ""
                  }`}
                >
                  {c.v}
                </dd>
                <dt className="mt-2 text-sm text-carbon-soft">
                  {c.s}
                  <span className="block">{c.k}</span>
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Why it escaped, and what we will not claim from it. */}
        <div className="mt-20 grid gap-10 border-t border-rule pt-12 md:grid-cols-3 md:gap-12">
          <div className="reveal">
            <h3 className="font-medium">Why the gate missed it</h3>
            <p className="mt-3 leading-7 text-carbon-soft">
              The held-out set is {gate.heldOut.toLocaleString()} examples of
              tool use, and contains{" "}
              <span className="text-carbon">
                {gate.answerExamples} examples that simply ask the model to
                answer
              </span>
              . A set with no answering in it cannot fail a model for refusing
              to answer.
            </p>
          </div>
          <div className="reveal">
            <h3 className="font-medium">The likeliest cause, unproven</h3>
            <p className="mt-3 leading-7 text-carbon-soft">
              {corpus.refusalTargets.toLocaleString()} of{" "}
              {corpus.records.toLocaleString()} records in the corpus it trained on
              have a refusal as the target, every one labelled ANSWER. That is an
              association. We have not shown it is the cause, and the regex that
              counts it has not had its precision measured yet.
            </p>
          </div>
          <div className="reveal">
            <h3 className="font-medium">What it cost to find</h3>
            <p className="mt-3 leading-7 text-carbon-soft">
              ${gate.cost.toFixed(2)} of H200 time: $
              {gate.continuationCost.toFixed(2)} across {gate.gpuRuns} runs, plus a
              ${gate.priorRunCost.toFixed(2)} earlier run. The capability numbers
              recompute from {gate.perExampleRecords.toLocaleString()} per-example
              records without a GPU, including the runs we later invalidated and
              kept.
            </p>
            <a
              href={study.audit}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-medium text-signal underline underline-offset-4 hover:text-signal-deep"
            >
              Audit, including what it retracted
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
