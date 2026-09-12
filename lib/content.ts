export const site = {
  name: "Experimental Intelligence",
  wordmark: ["Experimental", "Intelligence"] as const,
  url: "https://experimentalintelligence.org",
  description:
    "Small models trained from scratch, with published weights, code and training logs.",
  email: "alpha@experimentalmachines.org",
  github: "https://github.com/alpharomercoma",
};

export const sibling = {
  name: "Experimental Machines",
  url: "https://experimentalmachines.org",
};

type Artifact = { label: string; href: string };

export const run = {
  params: "151M",
  tokens: "10B",
  gpu: "one H100",
  hours: "13.7 hours",
  code: "https://github.com/alpharomercoma/training-methodologies",
  note: "The learning rate holds at its peak through pretraining and decays in midtraining, which is what separates midtraining from a second pretraining run. At this size, post-training changes behaviour more than benchmark scores.",
};

export const model = {
  name: "Visual-Qwen",
  claim:
    "Tells sludge from ordinary short-form video with 99.0% accuracy on held-out clips.",
  how: "A frozen vision tower feeds 32 query tokens into Qwen3-4B through a 2M-parameter projector. The clip's Whisper transcript joins the same token stream. Only the projector and LoRA adapters are trained, on one H200.",
  ablation: "Vision alone reaches 89.0%. Adding the transcript adds ten points.",
  stack: [
    ["EVA-ViT-G/14", "frozen", "257 × 1408"],
    ["Q-Former", "frozen", "32 × 768"],
    ["Linear projector", "trained", "32 × 2560"],
    ["Whisper V3 Turbo", "transcript", "tokens"],
    ["Qwen3-4B + LoRA", "trained", "verdict"],
  ] as [string, string, string][],
  artifacts: [
    { label: "Code", href: "https://github.com/alpharomercoma/vqwen-qformer" },
    {
      label: "Weights",
      href: "https://huggingface.co/alpharomercoma/vqwen-qformer-tiktok-v2",
    },
    {
      label: "LLaVA-style variant",
      href: "https://github.com/alpharomercoma/visual-qwen-gpu",
    },
    { label: "MicroMARC thesis", href: "https://micromarc.vercel.app" },
  ] as Artifact[],
};

export const dataset = {
  name: "Sludge dataset",
  summary:
    "2,000 TikTok and YouTube clips labeled sludge or not, plus a 262-clip live out-of-distribution evaluation set. The training and test data behind Visual-Qwen.",
  facts: [
    ["Clips", "2,000"],
    ["Classes", "2"],
    ["Test clips", "300"],
    ["Live OOD clips", "262"],
    ["Size", "33 GB"],
  ] as [string, string][],
  href: "https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500",
};

export const further = [
  {
    name: "Taglish sentiment",
    desc: "Three-class sentiment for Tagalog, Taglish and English. Contamination-audited data, int8 ONNX for CPU.",
    status: "published",
    href: "https://github.com/alpharomercoma/taglish-sentiment-analysis",
  },
  {
    name: "Touch-native vision-action model",
    desc: "A foundation model for mobile games that learns continuous touch from screen recordings, then runs on the phone it plays on.",
    status: "planned",
    href: null,
  },
];

export const people = [
  {
    name: "Alpha Romer Coma",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/alpharomercoma/",
    github: "https://github.com/alpharomercoma",
  },
  {
    name: "Arjhine Ty",
    role: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/arrochi/",
    github: "https://github.com/arjhinety",
  },
];
