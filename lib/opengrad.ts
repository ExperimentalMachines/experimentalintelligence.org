// OpenGrad Study 001. Every number is transcribed from an audited artifact in
// the OpenGrad repository and recomputes from 48,840 per-example records
// without a GPU. Sources: results/final_campaign_verdict.json,
// results/benchmarks/h200/capability_v1/{final_campaign_audit,regression_analysis}.json,
// reports/FINAL_CAMPAIGN_AUDIT.md.
//
// Two rules held while writing this file. Nothing is rounded in a direction
// that flatters the result, and nothing unmeasured is filled in by
// interpolation — M1-v1's corrected-budget MMLU-Pro run was terminated on
// budget and stays absent rather than estimated.

export const study = {
  id: "Study 001",
  model: "Qwen3.5-2B",
  site: "https://opengrad-site.vercel.app",
  repo: "https://github.com/arjhinety/OpenGrad",
  audit:
    "https://github.com/arjhinety/OpenGrad/blob/master/reports/FINAL_CAMPAIGN_AUDIT.md",
  weights:
    "https://huggingface.co/arrochi112/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2",
};

// The metric the campaign optimised. Confirmatory partition, n=1,277.
// Deltas are derived, never stored beside the endpoints they come from — a
// hand-maintained difference is free to drift away from the pair it describes.
const measured = { from: 0.6191, to: 0.7548, overCallFrom: 0.6425, overCallTo: 0.1529 };
export const toolPolicy = { ...measured, delta: measured.to - measured.from };

// The same checkpoint, measured on real IFEval, GSM8K and MMLU-Pro. One engine
// configuration across all stages — vLLM 0.29.0, bfloat16, greedy, seed 0 — so
// no difference between stages is attributable to the runtime.
export const ladder = [
  {
    stage: "Base",
    note: "Qwen3.5-2B, no SFT, no DPO",
    callF1: 0.6191,
    gsmZero: 0.674,
    gsmZeroRefusal: 0.0,
    gsmFew: 0.704,
    ifeval: 0.6784,
    mmlu: 0.49,
  },
  {
    stage: "M0 · SFT",
    note: "where every regression first appears",
    callF1: 0.747,
    gsmZero: 0.0,
    gsmZeroRefusal: 1.0,
    gsmFew: 0.563,
    ifeval: 0.451,
    mmlu: 0.37,
  },
  {
    stage: "M1-v2 · DPO",
    note: "promoted checkpoint",
    callF1: 0.7548,
    gsmZero: 0.0,
    gsmZeroRefusal: 1.0,
    gsmFew: 0.555,
    ifeval: 0.4584,
    mmlu: 0.37,
  },
] as const;

// Base → M0, in percentage points. Measured in regimes where the refusal rate
// is approximately zero, which is what makes them capability claims rather
// than restatements of the refusal behaviour. The drop is derived from the
// endpoints so the figure and its bars cannot disagree.
export const losses = (
  [
    { name: "IFEval strict", from: 67.8, to: 45.1, refusal: "19.0%" },
    { name: "GSM8K 8-shot", from: 70.4, to: 56.3, refusal: "0%" },
    { name: "MMLU-Pro 5-shot", from: 49.0, to: 37.0, refusal: "0%" },
  ] as const
).map((l) => ({ ...l, delta: l.to - l.from }));

// The contrast that separates a refusal policy from a capability loss. Same
// 1,319 questions in both arms; only the exemplars differ.
export const regime = {
  n: 1319,
  zeroShotRefusal: 1.0,
  fewShotRefusal: 0.0,
  fewShotSolved: 0.555,
  baseZeroShotSolved: 0.674,
};

export const gate = {
  heldOut: 3650,
  answerExamples: 0,
  perExampleRecords: 48840,
  gpuRuns: 13,
  cost: 11.39,
  byteIdenticalDpo: 0.8196,
};

// Association, not demonstrated cause. The count comes from a heuristic regex
// whose precision has not yet been measured, which is the first gate on the
// follow-up experiment.
export const corpus = {
  records: 217903,
  refusalTargets: 21749,
  allLabelledAnswer: true,
};
