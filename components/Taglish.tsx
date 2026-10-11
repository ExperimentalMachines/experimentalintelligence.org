import Bars from "@/components/Bars";
import Go from "@/components/Go";
import { card, h2, lede, link, ProjectLabel } from "@/components/ui";
import { taglish } from "@/lib/content";

export default function Taglish() {
  return (
    <section id="taglish" className="scroll-mt-28 bg-bench lg:scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <ProjectLabel name="Taglish sentiment" status="Results on GitHub" />
            <h2 className={`${h2} mt-6`}>Sentiment in Tagalog, Taglish and English.</h2>
          </div>
          <p className={`${lede} max-w-xl`}>
            A three-class sentiment model for Filipino reviews and posts, fine-tuned from {taglish.base}. Its data is
            de-duplicated across splits, near-duplicates included, and an int8 ONNX build runs on a CPU.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className={`${card} bg-white`}>
            <p className="text-sm font-medium">Macro-F1 on the test set, by language</p>
            <div className="mt-5">
              <Bars
                max={1}
                rows={taglish.slices.map((s) => ({ label: s.label, value: s.value, shown: s.value.toFixed(3) }))}
                caption={
                  <>
                    {taglish.macroF1.toFixed(3)} overall, against {taglish.baseline.toFixed(3)} for a TF-IDF baseline.
                  </>
                }
              />
            </div>
          </div>
          <div className={`${card} flex flex-col bg-white`}>
            <p className="text-sm font-medium">Median time to classify one text, Apple M5 CPU</p>
            <div className="mt-5">
              <Bars
                rows={taglish.latency.map((l) => ({ ...l, muted: l.label === "PyTorch" }))}
                caption={
                  <>
                    The int8 build is {taglish.size.to} instead of {taglish.size.from} and loses 0.001 macro-F1.
                  </>
                }
              />
            </div>
            <p className="mt-auto pt-8 text-base">
              <Go href={taglish.repo} className={link}>
                Source and results
              </Go>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
