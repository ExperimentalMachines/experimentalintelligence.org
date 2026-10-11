// OpenGrad Study 001. Every number is transcribed from an audited artifact in
// the OpenGrad repository. Sources: results/final_campaign_verdict.json,
// results/benchmarks/h200/capability_v1/{final_campaign_audit,regression_analysis}.json,
// reports/FINAL_CAMPAIGN_AUDIT.md, and for the quantized builds
// manifests/quantization/ptq_phase_closure_v1.json.
//
// Nothing is rounded in a direction that flatters the result, and nothing
// unmeasured is filled in.

export const study = {
  id: "Study 001",
  model: "Qwen3.5-2B",
  site: "https://opengrad.arjhinety.com/studies/001",
  repo: "https://github.com/arjhinety/OpenGrad",
  audit: "https://github.com/arjhinety/OpenGrad/blob/study-001/reports/FINAL_CAMPAIGN_AUDIT.md",
  weights: "https://huggingface.co/arjhinety/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2",
  gguf: "https://huggingface.co/arjhinety/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2-GGUF",
};

// Confirmatory partition, n=1,277. Base → promoted checkpoint (M1-v2).
export const toolPolicy = { from: 0.6264, to: 0.7548, overCallFrom: 62.4, overCallTo: 15.3 };

// Bare GSM8K, 1,319 questions: solved by the base, solved and refused by the
// promoted checkpoint.
export const bare = { n: 1319, baseSolved: 67.4, promotedSolved: 0.0, promotedRefused: 100 };

// Base → M0 (SFT), in percent, where the regression first appears. Measured
// where the refusal rate is near zero, which is what makes the bottom two
// capability results rather than restatements of the refusal behaviour.
export const losses = (
  [
    { name: "IFEval strict", from: 67.8, to: 45.1, refusal: "19%" },
    { name: "GSM8K 8-shot", from: 70.4, to: 56.3, refusal: "0%" },
    { name: "MMLU-Pro 5-shot", from: 49.0, to: 37.0, refusal: "0%" },
  ] as const
).map((l) => ({ ...l, delta: l.to - l.from }));

// What the frozen confirmatory partition asked of the model. It held no item
// that simply asks for an answer, so the gate could not see the refusals.
export const heldOut = [
  { label: "Call a tool", n: 453 },
  { label: "Say it can't", n: 453 },
  { label: "Ask to clarify", n: 371 },
  { label: "Just answer", n: 0 },
];

export const cost = { total: 11.39, runs: 13 };

// The promoted checkpoint quantized nine ways for llama.cpp. Agreement is the
// share of the 1,277 confirmatory decisions unchanged from the unquantized
// GGUF; `passes` is the frozen quantization_preservation_v1 gate.
export const ladder = [
  { format: "Q2_K", gib: 0.9, agreement: 53.4, passes: false },
  { format: "IQ3_M", gib: 0.99, agreement: 77.1, passes: false },
  { format: "Q3_K_M", gib: 1.02, agreement: 77.1, passes: false },
  { format: "IQ4_XS", gib: 1.11, agreement: 88.3, passes: false },
  { format: "Q4_K_S", gib: 1.13, agreement: 87.9, passes: false },
  { format: "Q4_K_M", gib: 1.19, agreement: 87.2, passes: false },
  { format: "Q5_K_M", gib: 1.31, agreement: 95.0, passes: false },
  { format: "Q6_K", gib: 1.45, agreement: 98.0, passes: true },
  { format: "Q8_0", gib: 1.87, agreement: 98.7, passes: true },
];
