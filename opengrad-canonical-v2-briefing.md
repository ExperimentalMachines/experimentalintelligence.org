# OpenGrad "Canonical v2" corpus — verified briefing

Research date: fetched live from GitHub / raw.githubusercontent.com / Hugging Face APIs and cards.
Every claim below is traceable to a URL that was actually fetched. "Verified" = observed in the
fetched artifact. "Could not verify" = no source found.

---

## 0. Top-line answers

| Question | Answer |
|---|---|
| Is there a `study-001` **branch**? | **No.** `study-001` is an annotated **git tag**, not a branch. Only `master` exists as a branch. |
| Exact corpus identity | **OpenGrad ToolPolicy Canonical (v2 final)**, `release_version: v2.0.0`, `release_class: PRE_TRAINING_CANONICAL_RELEASE`, `canonical_schema_version: tool_use_ir_v1`, `supervision_contract_version: supervision_contract_v1` |
| Size | **173,237 canonical records**; 161,966 trainable; 176 output shards |
| Corpus fingerprint | sha256 of the release manifest = `8ced403b996e563d6e279aee7fdb346fc829fe5ff6af9daf8ef47c0a4007e161` — **independently re-verified** by hashing the published manifest |
| Refusal claim | **CONFIRMED exactly**: 18,114 of 173,237 (10.456%) have a refusal target, and **all 18,114 are labelled `ANSWER`** |
| Complete upstream list | **FOUR sources**: xLAM/APIGen-60k, Glaive Function Calling v2, ToolACE, When2Call |
| `nvidia/When2Call` used? | Yes — and it is CC-BY-4.0 (verified) |
| Hermes / xlam-irrelevance-7.5k used? | **No. Zero occurrences anywhere in the repo.** |
| Where hosted | `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2` (also resolves as `arrochi112/...`) |
| Its own license | Field is `license: other`; the corpus is **composite per source** — it does not have a single SPDX license |

---

## 1. Repository and the `study-001` ref

| Fact | Value | Source URL |
|---|---|---|
| Repo | `arjhinety/OpenGrad`, public, created 2026-09-02 | `https://api.github.com/repos/arjhinety/OpenGrad` |
| Default branch | `master` @ `ae6fbc88e01f107ffbd935589960a1c22deac8e6` | `https://api.github.com/repos/arjhinety/OpenGrad/branches` |
| Branches present | **`master` only** | `https://api.github.com/repos/arjhinety/OpenGrad/git/refs/heads` |
| `study-001` as a branch | **404 — does not exist** | `https://api.github.com/repos/arjhinety/OpenGrad/branches/study-001` |
| `study-001` as a **tag** | Present. Annotated tag object `a6fff0df28d99ceb678c89231a736478716048ea` → commit **`5ed5d7fc63e868641248a5fc121dfbe592b4bb9a`** (2026-09-13T05:58:32Z) | `https://api.github.com/repos/arjhinety/OpenGrad/tags`, `https://api.github.com/repos/arjhinety/OpenGrad/git/tags/a6fff0df28d99ceb678c89231a736478716048ea` |
| Tag message | “Study 001: tool-policy post-training on Qwen3.5-2B. Frozen 2026-09-13. Landing page: https://opengrad.arjhinety.com/studies/001. Later corrections go through reports/ERRATA.md; new work belongs to Study 002.” | tag object above |
| Tag signature | `"verified": false, "reason": "unsigned"` | tag object above |
| Repo license metadata | GitHub reports `"license": {"key":"other","name":"Other","spdx_id":"NOASSERTION"}`; docs state OpenGrad **source code** is Apache-2.0 | repo API; `release/huggingface/toolpolicy-canonical-v2/README.template.md` |

**Important nuance for a public citation.** `https://github.com/arjhinety/OpenGrad/tree/study-001` and
`https://raw.githubusercontent.com/arjhinety/OpenGrad/study-001/...` both return **HTTP 200**, because
GitHub resolves tags at the same URL path shape as branches. A control request for a genuinely absent
ref (`.../no-such-branch-xyz/README.md`) returns 404. So the site's `study-001` links resolve — but
the correct name for the ref is **tag `study-001`**, and it must not be described as a branch.

Files were compared across the two refs: for every path checked the tag content is **byte-identical
to master** (SHA-256 equal): `reports/FINAL_CAMPAIGN_AUDIT.md`,
`results/final_campaign_verdict.json`,
`results/benchmarks/h200/capability_v1/sft_refusal_supervision_audit_canonical_v2.json`,
`release/huggingface/toolpolicy-canonical-v2-final/source-licenses.md`, `registry/datasets.yaml`,
`configs/releases/toolpolicy_canonical_v2_final.yaml`.

---

## 2. The corpus: precise identity

Authoritative sources, all fetched:

- `configs/releases/toolpolicy_canonical_v2_final.yaml` (the tracked definition)
- `reports/data/canonical-v2-final-yield.json` (measured yield)
- `.release/hf/toolpolicy-canonical-v2-final/release-manifest.json` — and the **published copy** at
  `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/release-manifest.json`
- `registry/datasets.yaml` (entry id `canonical_v2_final`)

Verified numbers:

| Quantity | Value |
|---|---|
| Canonical records | **173,237** |
| Trainable records (at the training boundary) | **161,966** |
| Output shards | **176** |
| Total records with a tool call in the target | 105,140 |
| Records with an answer target (no tool call) | 56,826 |
| `max_seq_length` used for yield measurement | 2048 |
| Base model for rendering | `Qwen/Qwen3.5-2B` |
| OpenGrad commit that built it | `5d39594714316fc557319b09910b14da01ab2a0d` |
| Manifest sha256 (corpus fingerprint) | `8ced403b996e563d6e279aee7fdb346fc829fe5ff6af9daf8ef47c0a4007e161` |

**Independent third-party confirmation of the row count.** The Hugging Face dataset viewer reports
`num_rows: 173237`, `num_columns: 23`, config `canonical`, split `train`, parquet bytes 111,651,053:

- `https://datasets-server.huggingface.co/size?dataset=arjhinety/OpenGrad-ToolPolicy-Canonical-v2`
- `https://datasets-server.huggingface.co/info?dataset=arjhinety/OpenGrad-ToolPolicy-Canonical-v2`

The shard layout was verified from the Hub file listing: 181 files total =
99 `glaive-function-calling-v2-*.parquet` + 58 `xlam-function-calling-60k-*.parquet`
+ 12 `toolace-*.parquet` + 7 `when2call-*.parquet` + `README.md`, `CITATIONS.bib`,
`source-licenses.md`, `release-manifest.json`, `.gitattributes`.

### Format and fields

A single unified **Parquet** table (config `canonical`, split `train`), **23 columns**, verified from
the dataset-viewer `info` endpoint:

```
opengrad_id, source_dataset, source_repo, source_record_id, source_split, source_revision,
source_license, redistribution_status, modification_status, upstream_access_mode,
downstream_access_requirement, adapter, adapter_version, canonical_schema_version,
canonical_hash, quality_status, contamination_status, behavior_decision, behavior_confidence,
behavior_capabilities, tools, messages, metadata
```

`tools`, `messages` and `metadata` are **JSON-serialized strings**, not nested structs (viewer dtypes
are all `string`). Source-level views are obtained by filtering on `source_dataset` / `source_split`.

### Supervision contracts (this is the "v2 final" defining feature)

| Contract | Trainable | Fraction | Meaning |
|---|---:|---:|---|
| `COMPLETE_TRAJECTORY` | 105,876 | 0.653693 | a full trajectory; terminal target is the assistant final response; a result is required after a terminal call |
| `CALL_PREDICTION` | 56,090 | 0.346307 | next-tool-call prediction; the terminal target *is* the call; **no** result required |

Per source: `xlam-function-calling-60k → CALL_PREDICTION`; `glaive-function-calling-v2`,
`toolace`, `when2call → COMPLETE_TRAJECTORY`.
Source: `reports/data/canonical-v2-final-yield.json`, `registry/datasets.yaml`.

### The refusal / 18,114 figure — CONFIRMED

From `results/benchmarks/h200/capability_v1/sft_refusal_supervision_audit_canonical_v2.json`
(URL: `https://raw.githubusercontent.com/arjhinety/OpenGrad/master/results/benchmarks/h200/capability_v1/sft_refusal_supervision_audit_canonical_v2.json`):

```json
"totals": { "records_audited": 173237,
            "refusal_targets": 18114,
            "refusal_target_rate": 0.10456195847307447,
            "refusal_targets_by_decision_label": { "ANSWER": 18114 } }
```

Per source (all refusals labelled `ANSWER` in every source):

| Source | Records audited | Refusal targets | Refusal rate |
|---|---:|---:|---:|
| `when2call` | 6,505 | 4,038 | 0.6208 |
| `glaive-function-calling-v2` | 98,339 | 14,066 | 0.1430 |
| `toolace` | 11,051 | 10 | 0.0009 |
| `xlam-function-calling-60k` | 57,342 | 0 | 0.0 |
| **total** | **173,237** | **18,114** | **0.1046** |

Detector: `HEURISTIC_REGEX_v1` — the same detector used to score inference. Scope: **single-exchange
records only**. The file states explicitly that it is descriptive and that **causation is not
established**; 9,124 multi-turn `CALL`-labelled records whose *last* turn is a refusal were
deliberately excluded from the mislabelled totals. The audit supersedes an earlier audit over the
normalization-v1 sources (21,749 of 217,903) that was *not* this corpus.

Corroborated in three further fetched places: the HF dataset card (lines 102–124),
`reports/FINAL_CAMPAIGN_AUDIT.md` §5, and
`release/huggingface/toolpolicy-canonical-v2-minus-xlam/README.md`.

---

## 3. THE COMPLETE upstream dataset list

**Four sources.** No others. This is stated consistently in the release config, the registry, the
published manifest and the published dataset card.

| # | Source (registry id) | HF / upstream URL | License | Raw count | Canonical | Trainable | Role in corpus | Contract |
|---|---|---|---|---:|---:|---:|---|---|
| 1 | `xlam-function-calling-60k` (xLAM / APIGen Function Calling 60k, org Salesforce) | https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k | **CC-BY-4.0** (verified from HF API `cardData.license`; upstream is `gated: "auto"`) | 59,370 | 57,342 | 56,090 | Function selection + argument generation; the only `CALL_PREDICTION` source | `CALL_PREDICTION` |
| 2 | `glaive-function-calling-v2` (org glaiveai) | https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2 | **Apache-2.0** (verified from HF API) | 112,960 | 98,339 | 97,112 | Real multi-turn trajectories; every call answered by a function-response turn | `COMPLETE_TRAJECTORY` |
| 3 | `toolace` (org Team-ACE) | https://huggingface.co/datasets/Team-ACE/ToolACE | **Apache-2.0** (verified from HF API) | 11,300 | 11,051 | 2,259 | Complex schemas, candidate tools, parallel/dependent calls, negatives | `COMPLETE_TRAJECTORY` |
| 4 | `when2call` (org NVIDIA) | https://huggingface.co/datasets/nvidia/When2Call (+ https://github.com/NVIDIA/When2Call) | **CC-BY-4.0** (verified from HF API; card front-matter reads `license: cc-by-4.0`) | 15,000 (`train_sft` split only) | 6,505 | 6,505 | Call / no-call **decisions** in prose: decline, ask for the missing detail, or answer directly. Carries **no** structured call and no tool result | `COMPLETE_TRAJECTORY` |

Redistribution status recorded per source in the manifest:
xLAM = `PERMITTED_WITH_ATTRIBUTION` (upstream_access_mode `gated`),
Glaive/ToolACE/When2Call = `REDISTRIBUTION_WITH_ATTRIBUTION` (upstream_access_mode `public`).
All four: `downstream_access_requirement: public_allowed`, `attribution_required: true`,
`citation_required: true`, `modification_status: NORMALIZED_DERIVATIVE`, `adapter_version: 1.0.2`.

### Pinned revisions (exact, as recorded)

| Source | Revision recorded | Nature of that revision |
|---|---|---|
| xLAM | `26d14ebfe18b1f7b524bd39b404b50af5dc97866` | Hub commit |
| When2Call | `0582f7749df63a96fdc3070932e83e72396ace53` | Hub commit |
| Glaive | canonical-v2: `7e7e32f0466699513b38923bc4991858e192c9274df22e243b9e77eb2775b6e8` / canonical-v1: `e7f4b6456019f5d8bcb991ef0dd67d8ff23221ac` | **SHA-256 of the local input file**, *not* a Hub revision |
| ToolACE | canonical-v2: `7a7a6a2c3b1003c7` (first 16 hex of `7a7a6a2c3b1003c789bb…`) / canonical-v1: `6bda777c88d21e5a204703c1ee45597a8fa4f734` | **SHA-256 prefix of the local input file** |

The published card states this explicitly and notes the Hub revisions for Glaive and ToolACE are
`e7f4b645…` and `6bda777c…`. **Do not label the Glaive/ToolACE v2 values as "Hub revisions"** — they
are local file hashes.

### Registered-but-NOT-included sources

| Source | URL | License | Status in OpenGrad |
|---|---|---|---|
| **BUTTON / BUTTONInstruct** (PKU-Baichuan-MLSystemLab) | https://github.com/PKU-Baichuan-MLSystemLab/BUTTON | **CC-BY-4.0** — verified by fetching the repo LICENSE file (opens “Attribution 4.0 International”) | **Excluded** from v2 final: *“upstream repository is access-gated (HTTP 401); not fetched, not approximated.”* Was in v1 with 7,941 records. |
| **LoopTool-23k** (zhangkangning) | https://huggingface.co/datasets/zhangkangning/LoopTool-23k | **Apache-2.0** — verified from HF API | **Excluded** from v2 final: *“upstream source was not located; not fetched, not approximated.”* Was in v1 with 20,827 records; flagged `known_source_overlap: POSSIBLE_DERIVATION_OVERLAP` (ToolACE-derived lineage). |
| **Salesforce/APIGen-MT-5k** | https://huggingface.co/datasets/Salesforce/APIGen-MT-5k | **CC-BY-NC-4.0** — verified from HF API | Registered in `registry/datasets.yaml`, but `planned_initial_mixture_percent: 0`, `contamination_status: EXCLUDED_FROM_CLEAN_DEFAULT`, intended stage `future_contaminated_experiment_only`. **Not present in v1, v2-partial or v2-final.** Excluded for **τ-bench/τ² contamination risk**, not for its NC license. |

### Sources explicitly checked and found ABSENT

Grepped the entire extracted `master` tree (all `.md`, `.yaml`, `.yml`, `.py`, `.json`, `.bib`, `.txt`)
case-insensitively:

| Expected source | Occurrences in OpenGrad repo |
|---|---|
| `NousResearch/hermes-function-calling-v1` | **0** |
| `interstellarninja/hermes-function-calling-v1` | **0** |
| `MadeAgents/xlam-irrelevance-7.5k` | **0** |

The only `hermes`-adjacent hits were unrelated prose inside
`reports/baselines/qwen35_2b_baseline/predictions.jsonl` (a film list). The only `irrelevance` hit was
a description of **BFCL V4**'s category list in `docs/evaluation/BENCHMARK_STRATEGY.md` — a *benchmark*,
not training data. So the sources you anticipated from that pattern are **not** part of Canonical v2.

---

## 4. Why sources were included / excluded — what the project actually says

All quotes below are verbatim from fetched files.

**Exclusions for availability, not license** (`configs/releases/toolpolicy_canonical_v2_final.yaml`):

```yaml
redistribution_policy: exclude_uncleared
allow_gated_sources: false
excluded_sources:
  - id: button
    reason: upstream repository is access-gated (HTTP 401); not fetched, not approximated
  - id: looptool-23k
    reason: upstream source was not located; not fetched, not approximated
```

**The one license-motivated mechanism** is the release-builder guard
`redistribution_policy: exclude_uncleared` plus `allow_gated_sources: false`. **No source in
OpenGrad's history is documented as rejected *because* of its license.** `Salesforce/APIGen-MT-5k`
is the only non-permissive (CC-BY-NC-4.0) dataset the project registers, and it is excluded on
**contamination** grounds, not license grounds:
*“`Salesforce/APIGen-MT-5k` is excluded from the clean default because of possible τ-bench/τ² overlap.”*
(`docs/publishing/huggingface-datasets.md`)

**Why xLAM is included despite being gated** (`docs/publishing/source-redistribution-audit.md`, decision dated 2026-09-04):
*“normalized xLAM-derived records may be included in OpenGrad's public dataset release under CC BY 4.0
with attribution, modification disclosure, upstream provenance, and APIGen citation. The upstream
access gate is modeled independently and is not reproduced downstream. This is a project provenance
decision, not formal legal advice.”*

**Why xLAM is reconstructed rather than fetched** (`configs/releases/toolpolicy_canonical_v2_final.yaml`):
v2-final rebuilds xLAM from the *published v1 derivative* because upstream is gated: *“The derivation
is representational only and is verified record by record: `tools` is copied verbatim and
`query`/`answers` are recovered from the turns `adapt_xlam` itself produced.”* The card adds
*“59,370/59,370 with zero mismatches.”*

**Why refusal targets were NOT filtered out.** No statement anywhere says refusal-bearing records
were excluded or relabelled. On the contrary, `ROADMAP.md` step 16 assigns “the refusal relabelling”
to Study 002, and the study-001 freeze commit says Study 002 will take it up. The corpus retains them.
Explicit non-causal caveat in the audit file:
*“Causation. These counts show refusal text is present in the supervision … Establishing that these
records CAUSED the behaviour requires the ablation: retrain M0 with the mislabelled records removed or
relabelled, hold every other factor fixed, and re-measure GSM8K zero-shot refusal rate.”*

**Why ToolACE keeps only 20.4%** (published card): 8,476 of its records *“end on an assistant call that
no tool message answers. Those are quarantined rather than reclassified, because the available bytes do
not establish whether they are intended next-call supervision or truncated trajectories.”*

### Quarantine / attrition ledger (published card)

| Cause | Records | Attribution |
|---|---:|---|
| Unrepresentable at the schema layer | 2,028 | xLAM at canonicalization (59,370 → 57,342); adapter refuses `Union`, `Callable`, `set` |
| `SEM_ARGUMENT_INVALID` | 1,231 | xLAM — described as **upstream data quality** |
| Unresolved non-terminal calls | 8,476 | ToolACE |
| `TARGET_TRUNCATED` | 700 | Glaive 363, ToolACE 316, xLAM 21 |
| `UNRENDERABLE` | 864 | Glaive |
| **Training-boundary drops** | **11,271** | 173,237 canonical − 11,271 = **161,966 trainable** |

---

## 5. Hosting, revision and license of the corpus itself

| Item | Value | Source |
|---|---|---|
| Canonical Hub repo id | **`arjhinety/OpenGrad-ToolPolicy-Canonical-v2`** | `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2` |
| Legacy alias | `arrochi112/OpenGrad-ToolPolicy-Canonical-v2` resolves to the **same** repo (identical API response). `arrochi112` is the author's former username; the repo's own config/registry still use it. | `https://huggingface.co/api/datasets/arrochi112/OpenGrad-ToolPolicy-Canonical-v2` |
| Current `main` revision | `459bc01bdd6c4b737cd8fa98e42d8221532a6563` (2026-09-13, “Correct card against committed artifacts (OpenGrad claim audit, 2026-09-13)”) | `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/commits/main?limit=6` |
| Hub tag for the freeze | `study-001` → `a60f9dfb2c2eee0c36a5e3bc31e418524442ae98` | `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/refs` |
| Publication commit recorded in repo | `66470c07ed0a79941f49a5cf67c1b3b1a7d8196e` (2026-09-11) — **stale** relative to current `main` | `docs/publishing/huggingface-datasets.md` |
| Downloads / gated | `downloads: 43`, `gated: false`, `private: false` | HF API |
| Card license field | `license: other` | card front-matter |
| Actual licensing model | **Composite per source.** *“Upstream dataset terms remain source-specific and are documented in `source-licenses.md`; this release does not relicense upstream data.”* OpenGrad **source code** is Apache-2.0 and that does **not** propagate to the data. | card; `source-licenses.md` |
| Download | HF dataset repo (Parquet). Not a GitHub release — the repo has `has_downloads: false` and no releases. | repo API; HF file listing |

### All datasets published by HF user `arjhinety` (complete, from the API)

- `arjhinety/OpenGrad-ToolPolicy-Canonical-v2` ← **the Canonical v2 final corpus, 173,237 records**
- `arjhinety/OpenGrad-ToolPolicy-Canonical-v2-M0-snapshot` (partial 3-source snapshot, 103,036 records, fingerprint `09018d26…`)
- `arjhinety/OpenGrad-ToolPolicy-Canonical-v1` (213,951 records, 6 sources, fingerprint `181b3fba…`)
- `arjhinety/OpenGrad-ToolPolicy-Canonical-v2-minus-xlam` (view: 115,895 records, xLAM removed)
- `arjhinety/OpenGrad-Qwen3.5-2B-M0-SFT-CorpusV1-evaluation`

Source: `https://huggingface.co/api/datasets?author=arjhinety&limit=100`

Models include the one you named, `arjhinety/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2`
(card fetched; it declares `datasets: - arrochi112/OpenGrad-ToolPolicy-Canonical-v2`, base model
`Qwen/Qwen3.5-2B`, `license: other` / `license_name: composite-per-source`).

---

## 6. Discrepancies you should know about before publishing

These are **verified contradictions between published artifacts** — relevant because your dataset
section will cite licenses.

1. **The corpus's own published `source-licenses.md` is stale and under-inclusive.**
   `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/source-licenses.md`
   has SHA-256 `DDCB5390FE89106935FEBCE66C8D848DD2D0A462F001AE0A8303D7DAFF4D3BFB`, which is
   **byte-identical** to the *partial* snapshot file
   `release/huggingface/toolpolicy-canonical-v2/source-licenses.md` (and to
   `.../toolpolicy-canonical-v2-final/source-licenses.md`). It states:
   *“This release is a **partial** v2 candidate and contains records from **three** sources only”*
   and lists `Salesforce/xlam-function-calling-60k` under **“Sources not in this release”** with the
   reason *“Upstream repository is access-gated; not fetched.”*
   But the payload provably **does** contain xLAM: the same repo's `release-manifest.json` records
   xLAM with `records: 57342`, the Hub file listing contains **58 xlam parquet shards**, and the
   dataset viewer totals 173,237 rows. **Consequence: the published license/attribution file omits
   xLAM's entry entirely.** If you cite a per-source license table from OpenGrad's own published file,
   you will under-attribute xLAM. The xLAM licence term (CC-BY-4.0) is instead recorded in
   `release-manifest.json`, `registry/datasets.yaml`, `configs/releases/toolpolicy_canonical_v2_final.yaml`,
   and the Canonical-v1 card.

2. **The published `CITATIONS.bib` has no APIGen / xLAM citation.** It contains only `opengrad`,
   `toolace2024`, `when2call2025`, `glaivev2` — while `release-manifest.json` records for xLAM
   `citation_required: true`, `citation_target: "APIGen"`. The audit file's earlier decision required
   *“APIGen citation”* as a condition of including xLAM.

3. **`CITATIONS.bib` points at the author's old handle**: `url = {https://github.com/arrogance231/OpenGrad}`
   on the Hub, versus `https://github.com/arjhinety/OpenGrad` in the repo copy. Consistent with the
   `arrochi112` → `arjhinety` account rename.

4. **Self-noted inconsistency in the repo's policy.** The minus-xlam card states that inheriting
   attribution files which over-list sources is *“deliberate: attribution files should over-include
   rather than risk dropping a licence obligation.”* The parent corpus's own `source-licenses.md`
   does the opposite for xLAM — it excludes a source that is present.

5. **The study page links `/tree/study-001`, `/blob/study-001/...`** which resolve, but no such
   branch exists; `study-001` is a tag. Cite the **tag** and commit `5ed5d7fc…`.

---

## 7. Unverified / open questions

- **Upstream license *text* vs. HF metadata tag.** All four licenses above were verified from the
  Hugging Face API `cardData.license` field (and, for BUTTON, from the repo `LICENSE` file, which
  reads “Attribution 4.0 International”). I did **not** fetch and parse each upstream `LICENSE` file
  end-to-end, and I did not locate a `LICENSE` file in the NVIDIA/When2Call GitHub repo —
  `https://raw.githubusercontent.com/NVIDIA/When2Call/main/LICENSE` returns `404: Not Found`. The
  CC-BY-4.0 claim for When2Call rests on the HF dataset card front-matter (`license: cc-by-4.0`)
  and the HF API, which is what OpenGrad itself relied on.
- **`Salesforce/xlam-function-calling-60k` is `gated: "auto"`.** The CC-BY-4.0 tag is visible in HF
  metadata, but I could not fetch the dataset card body without accepting the gate, so any additional
  upstream terms in the gated card text are **not verified here**. OpenGrad's audit separately notes
  the gate requires “acknowledgment and APIGen citation.”
- **No OpenGrad paper was found.** There is no arXiv/PDF of OpenGrad itself in the repo
  (`docs/references/papers.yaml` is a citation list, not an OpenGrad paper). The written rationale
  lives in `docs/publishing/source-redistribution-audit.md`, `docs/publishing/huggingface-datasets.md`
  and `reports/CANONICAL_V2_COMPLETION_REPORT.md`. If your dataset section needs a citable "why", cite
  those repo paths at the `study-001` tag rather than a paper.
- **The corpus has no single SPDX license identifier.** Both GitHub and Hugging Face surface
  `other`/`NOASSERTION`. If your site needs a licence string for the corpus row, "composite per
  source — CC-BY-4.0 (xLAM, When2Call) + Apache-2.0 (Glaive v2, ToolACE)" is accurate and traceable;
  a single identifier would be an invention.
- **Record counts per source at the *published* level** (173,237 split) are from
  `release-manifest.json` + `reports/data/canonical-v2-final-yield.json`, which agree. The
  "trainable" counts are also from both. I did not recompute them by reading all 181 Parquet files;
  the row total was independently confirmed by the HF viewer.
- **`reports/FINAL_CAMPAIGN_AUDIT.md` and `results/final_campaign_verdict.json`** were fetched and
  read for corpus-relevant claims. They are primarily about benchmark/capability results
  (GSM8K 0-shot refusal 100% for M0 and M1-v2; M1-v1 70.7%; MMLU-Pro 49.0% → 37.0%; IFEval strict
  67.8% → 45.1%) and repeat the same 18,114/173,237 corpus figure. I did not audit their benchmark
  arithmetic — that is outside the corpus question you asked.

---

## 8. Raw URLs fetched

**GitHub API**
- `https://api.github.com/repos/arjhinety/OpenGrad`
- `https://api.github.com/repos/arjhinety/OpenGrad/branches`
- `https://api.github.com/repos/arjhinety/OpenGrad/branches/study-001` (404)
- `https://api.github.com/repos/arjhinety/OpenGrad/git/refs?per_page=100`
- `https://api.github.com/repos/arjhinety/OpenGrad/git/refs/heads`
- `https://api.github.com/repos/arjhinety/OpenGrad/tags`
- `https://api.github.com/repos/arjhinety/OpenGrad/git/tags/a6fff0df28d99ceb678c89231a736478716048ea`
- `https://api.github.com/repos/arjhinety/OpenGrad/commits/5ed5d7fc63e868641248a5fc121dfbe592b4bb9a`
- `https://api.github.com/repos/arjhinety/OpenGrad/git/trees/master?recursive=1`

**raw.githubusercontent.com @ master (and @ study-001 where compared)**
- `configs/releases/toolpolicy_canonical_v2_final.yaml`
- `configs/releases/toolpolicy_canonical_v2.yaml`
- `configs/data/tool_calling/mixture_v1.yaml`, `source_baseline_v1.yaml`, `residual_policy_v1.yaml`, `balanced_policy_v1.yaml`
- `registry/datasets.yaml`
- `reports/data/canonical-v2-final-yield.json`
- `reports/data/canonical-v2-final-minus-xlam-yield.json`, `reports/data/canonical-v2-ablation-mass.json`
- `reports/CANONICAL_V2_COMPLETION_REPORT.md`
- `reports/FINAL_CAMPAIGN_AUDIT.md`
- `reports/SUPERVISION_CONTRACT_REPORT.md`
- `reports/data-normalization-v1.md`
- `reports/audits/study-001-claim-audit/README.md`
- `results/final_campaign_verdict.json`
- `results/benchmarks/h200/capability_v1/sft_refusal_supervision_audit_canonical_v2.json`
- `results/benchmarks/h200/capability_v1/sft_refusal_supervision_audit.json`
- `docs/publishing/source-redistribution-audit.md`, `docs/publishing/huggingface-datasets.md`
- `docs/data/normalization-sources.md`, `docs/data/source-support-matrix.md`, `docs/data/mixture-analysis.md`
- `release/huggingface/toolpolicy-canonical-v2/README.template.md`, `CITATIONS.bib`, `source-licenses.md`
- `release/huggingface/toolpolicy-canonical-v2-final/source-licenses.md`, `CITATIONS.bib`, `README.template.md`
- `release/huggingface/toolpolicy-canonical-v1/source-licenses.md`
- `.release/hf/toolpolicy-canonical-v2-final/release-manifest.json`
- `runs/m0_sft_canonical_v2_final/dataset_manifest.json`

**Hugging Face**
- `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2`
- `https://huggingface.co/api/datasets/arrochi112/OpenGrad-ToolPolicy-Canonical-v2`
- `https://huggingface.co/api/datasets?author=arjhinety&limit=100`
- `https://huggingface.co/api/models?author=arjhinety&limit=100`
- `https://huggingface.co/api/models/arjhinety/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2`
- `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/refs`
- `https://huggingface.co/api/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/commits/main?limit=6`
- `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/README.md`
- `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/source-licenses.md`
- `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/release-manifest.json`
- `https://huggingface.co/datasets/arjhinety/OpenGrad-ToolPolicy-Canonical-v2/raw/main/CITATIONS.bib`
- `.../OpenGrad-ToolPolicy-Canonical-v2-M0-snapshot/raw/main/README.md`
- `.../OpenGrad-ToolPolicy-Canonical-v1/raw/main/README.md`
- `.../OpenGrad-ToolPolicy-Canonical-v2-minus-xlam/raw/main/README.md`
- `.../OpenGrad-Qwen3.5-2B-M0-SFT-CorpusV1-evaluation/raw/main/README.md`
- `https://huggingface.co/arjhinety/OpenGrad-Qwen3.5-2B-M1-DPO-CanonicalV2-Final-v2/raw/main/README.md`
- `https://datasets-server.huggingface.co/size?dataset=arjhinety/OpenGrad-ToolPolicy-Canonical-v2`
- `https://datasets-server.huggingface.co/info?dataset=arjhinety/OpenGrad-ToolPolicy-Canonical-v2`
- `https://huggingface.co/api/datasets/nvidia/When2Call`
- `https://huggingface.co/datasets/nvidia/When2Call/raw/main/README.md`
- `https://huggingface.co/api/datasets/Salesforce/xlam-function-calling-60k`
- `https://huggingface.co/api/datasets/glaiveai/glaive-function-calling-v2`
- `https://huggingface.co/api/datasets/Team-ACE/ToolACE`
- `https://huggingface.co/api/datasets/zhangkangning/LoopTool-23k`
- `https://huggingface.co/api/datasets/Salesforce/APIGen-MT-5k`
- `https://huggingface.co/api/datasets/NousResearch/hermes-function-calling-v1`
- `https://huggingface.co/api/datasets/interstellarninja/hermes-function-calling-v1`
- `https://huggingface.co/api/datasets/MadeAgents/xlam-irrelevance-7.5k`
- `https://huggingface.co/api/collections/arjhinety/opengrad-study-001`

**Other**
- `https://opengrad.arjhinety.com/studies/001`
- `https://raw.githubusercontent.com/NVIDIA/When2Call/main/LICENSE` (404)
- `https://raw.githubusercontent.com/PKU-Baichuan-MLSystemLab/BUTTON/main/LICENSE`
- `https://codeload.github.com/arjhinety/OpenGrad/tar.gz/refs/heads/master`
