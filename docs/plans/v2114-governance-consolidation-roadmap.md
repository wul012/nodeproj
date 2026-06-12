# v2114 Governance Consolidation Roadmap

Status: active. This plan replaces feature-loop growth with a consolidation milestone.
Executor: Codex (mechanical migration), following `docs/plans/v2114-codex-migration-playbook.md`.
Planner / final reviewer: Claude Code session 2026-06-12.

## Problem statement (measured 2026-06-12, HEAD = 7a6e1c09)

- `src/services`: 1,124 `.ts` files. Of these, 285 match "verification", 113 "echo", 143 "readiness", 25 "closure".
- 245 `*Renderer.ts` files share one hand-copied markdown layout (title, meta bullets, `##` sections rendered via `liveProbeReportUtils`). 127 have no local helpers; 118 have small local helper functions.
- `src/routes`: 80 files. `test/`: 529 files.
- Largest service files are ~40–47 KB with 60+ character names that stack 4+ meta-layers (verification of intake of plan of resolver).

The AGENTS.md "Governance Growth Control" rule (prefer catalog/template builders, write necessity proofs) exists but has no mechanical enforcement, so duplication kept compounding.

## Necessity proof (per AGENTS.md Governance Growth Control)

- Blocker resolved: renderer duplication makes every new version copy ~70–160 lines of layout code; the repo is unnavigable for outside readers and slow to maintain.
- Consumer: every future Node version that renders a markdown report; the portfolio/readability goal stated in START_HERE.md.
- Why existing code cannot be reused as-is: no generic report builder existed (existing `*Builder.ts` files are domain-specific packet builders). One was added in this version: `src/services/verificationReportBuilder.ts`.
- Stop condition: this plan adds exactly one shared builder and one ratchet test, then only *shrinks* code. No new echo/verification/readiness chains may be added while the plan is active.

## Scope

In scope:

1. **Foundation (prepared, must be verified first)**
   - `src/services/verificationReportBuilder.ts` — generic catalog-driven markdown report builder.
   - Two reference migrations (one simple-shape, one helper-shape):
     - `managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.ts`
     - `managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts`
   - `test/verificationReportBuilder.test.ts` — unit test of the builder.
   - `test/governanceGrowthRatchet.test.ts` — file-count ratchet (services ≤ 1125, routes ≤ 80; counts may only decrease).
2. **Bulk migration**: migrate all remaining `*Renderer.ts` files (243 remaining) to `renderVerificationReportMarkdown`, in batches, with byte-identical output. Existing tests are the proof of identity.
3. **Repo hygiene**: untrack `.idea/` (`git rm -r --cached .idea`) and add `.idea/` to `.gitignore`.
4. **Curated reading path**: add the "Curated tour" section to `START_HERE.md` (content provided in the playbook).

Out of scope (each would need its own necessity proof in a future plan):

- Moving archive folders `a/`–`f/` or `代码讲解记录*` out of the repo. They are load-bearing: 221 src/test files reference them, and tests verify archive artifacts on disk.
- Merging `*Renderer.ts` / `*Types.ts` files into their service files (file-count reduction, "Phase B"). Optional follow-up after all renderers are migrated.
- Any behavior, route, or markdown output change. This plan changes zero rendered bytes.
- Any new feature, echo, verification, or readiness chain.

## Version slicing (keep each commit under ~3000 changed lines)

- **v2114**: foundation verification + hygiene + START_HERE tour + first migration batch (~10 renderers) + plan docs + walkthrough + archive artifacts.
- **v2115+**: migration batches of 10–15 renderers per version. Simple renderers (no local helpers) first, helper renderers after. At 10–15 per version this is ~16–24 versions; batches may be larger if the changed-line budget allows.
- **Final version of the plan**: full test suite in chunks, build, closeout report, and a decision record on whether to run Phase B (file merges) or declare the consolidation done.

## Cross-project parallel statement (required by AGENTS.md)

Java and mini-kv are **recommended parallel** for the entire duration of this plan. Node consolidation only touches Node-internal rendering code, consumes no fresh upstream evidence, and is not a pre-approval blocker for any Java or mini-kv version.

## Enforcement

`test/governanceGrowthRatchet.test.ts` fails any change that grows `src/services` past 1125 files or `src/routes` past 80 files. The fix for a ratchet failure is consolidation, not raising the baseline. Baselines may be lowered as consolidation proceeds.

## After this plan

The feature loop does not resume by default. The next non-consolidation version should be the single remaining capability from START_HERE ("verify the dry-run package across Node, Java, and mini-kv without opening real production connections"), followed by a closeout version. Anything beyond that needs a fresh necessity proof.
