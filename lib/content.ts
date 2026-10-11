// One list, two readers. `email` stays the single primary address for anything
// that can only take one; `emails` is what the page renders.
const emails = ["alpha@experimentalmachines.org", "arjhine@experimentalmachines.org"] as const;

export const site = {
  name: "Experimental Intelligence",
  url: "https://experimentalintelligence.org",
  description:
    "A research lab that trains and post-trains small open models and measures what each step changes, including what gets worse.",
  email: emails[0],
  emails,
  github: "https://github.com/ExperimentalMachines",
};

export const sibling = {
  name: "Experimental Machines",
  url: "https://experimentalmachines.org",
  openweights: "https://github.com/ExperimentalMachines/openweights",
};

// The four projects, in the order the page tells them.
export const projects = [
  {
    id: "opengrad",
    name: "OpenGrad",
    line: "Post-training a 2B model for tool use, and measuring the side effects",
    status: "Study 001 published",
  },
  {
    id: "tool-choice",
    name: "Tool-choice contrast",
    line: "A test set that holds the question fixed and changes the tools",
    status: "In development",
  },
  {
    id: "from-scratch",
    name: "From scratch",
    line: "A 151M model trained through five stages on one GPU",
    status: "Run complete",
  },
  {
    id: "taglish",
    name: "Taglish sentiment",
    line: "Sentiment for Tagalog, Taglish and English text",
    status: "Results on GitHub",
  },
];

// From the tool-choice-contrast README. Nothing is frozen and nothing has been
// measured yet, so the counts are the design, not a result.
export const toolChoice = {
  repo: "https://github.com/ExperimentalMachines/tool-choice-contrast",
  rubric: "https://github.com/ExperimentalMachines/tool-choice-contrast/blob/main/docs/RUBRIC.md",
  arms: [
    { family: "Answer directly", tools: "No tools", gold: "Answer" },
    { family: "Answer directly", tools: "One irrelevant tool", gold: "Answer" },
    { family: "Answer directly", tools: "Three to five irrelevant tools", gold: "Answer" },
    { family: "Decide about a tool", tools: "The right tool, every parameter known", gold: "Call it" },
    { family: "Decide about a tool", tools: "The right tool, a parameter missing", gold: "Ask" },
    { family: "Decide about a tool", tools: "The right tool swapped for a wrong one", gold: "Say it can't" },
  ],
  items: 900,
  stems: 300,
};

// The 151M run. Read from the run's manifest (docs/runs/2026-08-14-main_150m.md
// in the training repository); the curves are in lib/run.ts.
export const run = {
  params: "151M",
  tokens: "10B",
  gpu: "one H100",
  hours: "13.7",
  // GSM8K (200 questions) after SFT and after GRPO, with DPO between: the share
  // of answers in the "#### <answer>" format, and the number solved.
  grpo: { formatFrom: 5.5, formatTo: 98.5, solvedFrom: 2, solvedTo: 3 },
};

// From the taglish-sentiment-analysis README, results of 2026-07-17.
export const taglish = {
  repo: "https://github.com/alpharomercoma/taglish-sentiment-analysis",
  base: "XLM-RoBERTa",
  macroF1: 0.7292,
  baseline: 0.6322,
  slices: [
    { label: "Tagalog", value: 0.813 },
    { label: "Taglish", value: 0.817 },
    { label: "English", value: 0.7 },
  ],
  latency: [
    { label: "PyTorch", value: 11.8, shown: "11.8 ms" },
    { label: "ONNX int8", value: 5.1, shown: "5.1 ms" },
  ],
  size: { from: "1.1 GB", to: "287 MB" },
};

export type Member = {
  name: string;
  role: string;
  href?: string;
  label?: string;
};

// The same team as experimentalmachines.org.
export const team: Member[] = [
  {
    name: "Alpha Romer Coma",
    role: "Co-Founder",
    href: "https://www.linkedin.com/in/alpharomercoma/",
    label: "LinkedIn",
  },
  { name: "John Andrew Balbarosa", role: "Co-Founder" },
  {
    name: "Arjhine Ty",
    role: "Co-Founder",
    href: "https://www.linkedin.com/in/arjhinety/",
    label: "LinkedIn",
  },
  {
    name: "Xynil Jhed Lacap",
    role: "Co-Founder",
    href: "https://github.com/mr-jones123",
    label: "GitHub",
  },
  {
    name: "JC Diamante",
    role: "Core Contributor",
    href: "https://github.com/Zeraphim",
    label: "GitHub",
  },
];
