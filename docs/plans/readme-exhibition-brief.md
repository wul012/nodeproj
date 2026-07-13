# README Exhibition Brief — one maintenance version (authorized 2026-07-13)

Execution version: Node v2202. This brief is the active ledger for the version.

## Step-0 reconciliation

- Repository reality on 2026-07-13: `master` and `nodeproj/master` both point to
  `afe79e18`; latest version tag is `v2201`; the only initial worktree item is this
  untracked, reviewer-authored brief.
- The Round-2 external review is committed and records PASS. The coordination
  repository authorizes exactly one README exhibition maintenance version per repo.
- Node does not need fresh Java, mini-kv, or aiproj evidence for this version. All
  three may continue independently; this documentation-only version changes no
  cross-project contract and is not their pre-approval blocker.

## Requirement-evidence matrix

| Requirement | Implementation surface | Reproducible evidence | Initial state |
|---|---|---|---|
| 30-second human exhibit | `README.md` top-level order and concise copy | local GitHub-flavored render + archived screenshot | missing |
| Exact maturity and production boundaries | existing pinned sentences moved byte-identically | `test/productionExcellenceDocs.test.ts` + typecheck of `test/productionMaturityContract.ts` | present, must survive |
| Every displayed number is sourced | badges and highlights link committed reports/gates | v2190/v2201 summaries + four committed census commands | sources verified |
| Architecture is transparent | Mermaid application and capstone flow | GitHub-flavored render; links to `src/integration/` and final evidence | missing |
| Verification is runnable | quickstart, four census commands, explicit live env inputs | local execution of the documented non-live commands | partial |
| Evidence and limits are easy to audit | evidence map and honest boundaries section | docs contract + link existence check | partial |
| Version closeout is complete | archive, walkthrough, changelog, ledger, commit/tag/push/CI | v2202 evidence summary + Node Evidence run | missing |

DONE requires every row to be complete, all linked repository paths to exist, the
focused docs contract and full suite to pass without changing pinned expectations,
the local README render to be readable, and the pushed Node Evidence workflow to be
green. A prose claim without those mechanical checks is not completion.

Goal: make the GitHub landing page communicate to a HUMAN VISITOR in 30 seconds what
this repo is, how strong it is, and how to verify every claim. Repo description and
topics are already set on GitHub; this version redesigns `README.md` as the exhibit.

Hard constraints (the reason this is a codex version, not a hot edit):
- `test/productionExcellenceDocs.test.ts` and `test/productionMaturityContract.ts` pin
  README phrases — the maturity label stays BYTE-EXACT; run BOTH docs tests locally
  before push; any pinned phrase that must move is moved verbatim, never reworded.
- Every number cited must come from a committed census/report and carry its command or
  file link. No new capability claims. Elegance gates apply. Full suite green.

## Target structure (top to bottom)

1. Badge row:
   `[![Node Evidence](https://github.com/wul012/nodeproj/actions/workflows/node-evidence.yml/badge.svg)](https://github.com/wul012/nodeproj/actions/workflows/node-evidence.yml)`
   plus shields.io static badges for: tests `1716`, coverage `95.9%`, source files >800 lines `0`.
2. Hero (EN, 3–4 sentences + one 中文 mirror paragraph): order-operations governance
   platform; byte-stable evidence reports; mechanical ratchets; owner of the live
   read-only four-project capstone. Include the exact maturity label line.
3. Highlights table: tests / coverage floors / lint 0-261≤263 / renderer census
   245-242-3-0 / source-size 0 oversized / elegance baseline 4,537 shrink-only —
   each row links to its committed gate or census command.
4. Mermaid architecture diagram: Fastify app → services/renderers → evidence reports;
   side lane: capstone probes → Java (HTTP read-only) / mini-kv (CLI) / aiproj
   (artifact file) → `readiness:cross` report.
5. Quickstart: install, `npm run typecheck`, `npx vitest run`, the four census
   commands, and the env-gated capstone command with its env vars.
6. Evidence map: `docs/plans/node-track-final-evidence.md`, the PROGRAM CLOSE section
   in `production-excellence-final-acceptance.md`, `d/2192/evidence/` capstone report,
   waiver manifests.
7. Boundaries section: keep the existing honest statements (read-only, no execution
   authority, not production) — verbatim where pinned.

## Ritual

One version: commit/tag/push, Node Evidence green, ledger row, walkthrough per repo
convention. Manual follow-up for the user (not codex): upload a social-preview image
in GitHub Settings → General → Social preview.

## Execution ledger

| Milestone | State | Evidence |
|---|---|---|
| Step-0 and metric provenance | complete | repository/tag/central-program reconciliation; four census commands reproduced |
| README information architecture | complete | 127-line exhibit with badges, bilingual hero, highlights, architecture, quickstart, evidence map, and boundaries |
| Contract preservation | complete locally | focused docs contract 7/7 after rewrite; pinned expectations unchanged |
| Visual verification | complete | GitHub GFM desktop 1440x1000 and mobile 390x844; four badges loaded; one Mermaid SVG; screenshot under `d/2202/图片/` |
| Version artifacts | complete | explanation, evidence summary, CHANGELOG, playbook row, and Chinese walkthrough 2172 |
| Final local gates | complete | focused docs 15/15; full Vitest 1141/1141 suites and 1716/1716 tests; typecheck/build/lint/security/archive/elegance/family/renderer/source-size green |
| Commit/tag/push/Node Evidence | pending | close only after remote workflow is green |

## Fail conditions

- A docs test updated to ACCOMMODATE a reworded pinned phrase = fail (move verbatim).
- Any number without a committed source = fail. CI red on push = closeout violation.
