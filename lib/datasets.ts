// The dataset section's content, kept separate from lib/content.ts because
// this is the one part of the site that has to carry licence terms and
// per-source accounting, and it is long enough to deserve its own file.
//
// Provenance rule for everything below: a licence is only stated where it was
// read off the source itself (the Hugging Face dataset card's front matter and
// the Hub API's cardData.license), never inferred from the name of a licence
// or copied from a summary. The corpus ships no single SPDX identifier — it is
// a union of four sources under two different licences — so nothing here
// collapses that to one label.

const LICENSE_HREF = {
  "CC-BY-4.0": "https://creativecommons.org/licenses/by/4.0/",
  "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
  "CC-BY-NC-4.0": "https://creativecommons.org/licenses/by-nc/4.0/",
  "CC-BY-NC-SA-4.0": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
} as const;

export type LicenseId = keyof typeof LICENSE_HREF;
export const licenseHref = (id: LicenseId) => LICENSE_HREF[id];

export type UpstreamSource = {
  repo: string;
  href: string;
  license: LicenseId;
  /** Rows read from upstream, before the canonical mapping. */
  upstream: string;
  /** Rows that entered the canonical release. */
  canonical: number;
  /** Rows that carry a trainable supervision contract. */
  trainable: number;
  /** Rows whose target is a refusal, counted by the v1 heuristic regex. */
  refusals: number;
  role: string;
  /** Anything a reader would need in order to re-derive the row honestly. */
  caveat?: string;
};

// Sums are load-bearing: canonical totals 173,237, trainable 161,966 and
// refusals 18,114, which is the same 18,114 the Study 001 section quotes. They
// are checked against the release manifest rather than typed once and trusted.
export const canonicalSources: UpstreamSource[] = [
  {
    repo: "glaiveai/glaive-function-calling-v2",
    href: "https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2",
    license: "Apache-2.0",
    upstream: "112,960",
    canonical: 98339,
    trainable: 97112,
    refusals: 14066,
    role: "Real multi-turn tool conversations — the bulk of the corpus.",
    caveat:
      "The revision recorded in the release is a hash of the local input file, not a Hub commit.",
  },
  {
    repo: "Salesforce/xlam-function-calling-60k",
    href: "https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k",
    license: "CC-BY-4.0",
    upstream: "59,370",
    canonical: 57342,
    trainable: 56090,
    refusals: 0,
    role: "Function selection and argument generation — the only call-prediction source.",
    caveat:
      "Gated upstream. Included under its attribution terms, which the manifest records as permitting redistribution.",
  },
  {
    repo: "Team-ACE/ToolACE",
    href: "https://huggingface.co/datasets/Team-ACE/ToolACE",
    license: "Apache-2.0",
    upstream: "11,300",
    canonical: 11051,
    trainable: 2259,
    refusals: 10,
    role: "Complex schemas, parallel calls, and negative examples.",
    caveat:
      "The revision recorded in the release is a hash of the local input file, not a Hub commit.",
  },
  {
    repo: "nvidia/When2Call",
    href: "https://huggingface.co/datasets/nvidia/When2Call",
    license: "CC-BY-4.0",
    upstream: "15,000",
    canonical: 6505,
    trainable: 6505,
    refusals: 4038,
    role: "Deciding whether to call at all, written out in prose rather than as a schema.",
  },
];

// Registered in the build configuration and deliberately not in this release.
// Kept on the page because "what we left out, and why" is the same class of
// fact as "what we put in" — and because two of these were in v1.
export const excludedSources = [
  {
    repo: "PKU-Baichuan-MLSystemLab/BUTTON",
    license: "CC-BY-4.0" as LicenseId,
    reason:
      "The upstream repository is access-gated and returned 401. Nothing was fetched and nothing was approximated, so it is simply absent rather than substituted. It contributed 7,941 rows to v1.",
  },
  {
    repo: "zhangkangning/LoopTool-23k",
    license: "Apache-2.0" as LicenseId,
    reason:
      "The upstream source could not be located. It contributed 20,827 rows to v1.",
  },
  {
    repo: "Salesforce/APIGen-MT-5k",
    license: "CC-BY-NC-4.0" as LicenseId,
    reason:
      "Excluded on contamination with the τ-bench and τ²-bench families, not on its licence — its planned share of the mixture was zero from the start.",
  },
];

export const canonical = {
  name: "OpenGrad ToolPolicy Canonical v2",
  short: "Canonical v2",
  href: "https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2",
  schema: "tool_use_ir_v1",
  fingerprint:
    "8ced403b996e563d6e279aee7fdb346fc829fe5ff6af9daf8ef47c0a4007e161",
  fingerprintNote: "SHA-256 of the release manifest, which you can re-hash.",
  summary:
    "One schema over four public function-calling datasets: 173,237 records, each mapped to a single tool-use intermediate representation and each tagged with the supervision contract it can carry. This is the corpus the promoted Study 001 checkpoint was supervised on, and the corpus the refusal finding was measured in.",
  facts: [
    ["Records", "173,237"],
    ["Trainable", "161,966"],
    ["Shards", "176"],
    ["Columns", "23"],
  ] as [string, string][],
  // COMPLETE_TRAJECTORY and CALL_PREDICTION partition the trainable set, and
  // the call-prediction half is exactly the xLAM half. That is a checkable
  // coincidence rather than a rounding.
  contracts: [
    ["COMPLETE_TRAJECTORY", "105,876", "65.4%"],
    ["CALL_PREDICTION", "56,090", "34.6%"],
  ] as [string, string, string][],
  carries: [
    "source_dataset",
    "source_repo",
    "source_split",
    "source_license",
    "redistribution_status",
    "modification_status",
  ],
};

export const sludge = {
  name: "Sludge / non-sludge clips",
  href: "https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500",
  license: "CC-BY-NC-SA-4.0" as LicenseId,
  summary:
    "2,000 TikTok and YouTube clips labelled sludge or not, plus a 262-clip live out-of-distribution evaluation set scraped after the corpus was frozen. The training and test data behind Visual-Qwen.",
  provenance:
    "Collected from TikTok and YouTube, then label-audited: 231 video-level labels were flipped against a model teacher and cross-judge, and the original labels are kept alongside the corrections so the disagreement stays inspectable. Non-commercial, share-alike, because the underlying videos are other people's.",
  facts: [
    ["Clips", "2,000"],
    ["Classes", "2"],
    ["Test clips", "300"],
    ["Live OOD clips", "262"],
    ["Size", "~34 GB"],
  ] as [string, string][],
  platforms: [
    ["TikTok", "1,680"],
    ["YouTube", "320"],
  ] as [string, string][],
};
