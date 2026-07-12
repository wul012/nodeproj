# Node Elegance Round 2 Family Triage

Date: 2026-07-12
Version: v2199 / E2-N1
State: local final gates passed; commit, tag, push, and clean-checkout CI pending.

## Scanner design note

- Abstraction: `family-logic-census` ranks only the 52 families already pinned by the elegance baseline.
- Data boundary: file membership, unique physical formatting lines, average lines, score, and top members.
- Behavior boundary: reuse the exact family classifier from `elegance-census.mjs`; do not invent a second suffix grammar.
- Formatting scope: named `render` / `format` / `markdown` function bodies plus formatting calls and Markdown literals outside them.
- Renderer exception: the existing renderer AST gate is authoritative; a fully standardized or valid composition-only family owns zero local formatting logic.
- Score: `memberCount * averageFormattingLines`, reported exactly as total unique formatting lines.
- Stop rule: ranking is planning evidence only; it cannot waive public paths, byte parity, tests, fixtures, or shrink-only baselines.

## Step-0 and boundaries

- Round 1 closes at `v2198` / `aeb2d2d7`; Node Evidence run `29187389490` is green.
- Claude's Round 1 review is PASS and authorizes this bounded successor; its uncommitted review note belongs to v2199.
- Java remains in an uncommitted v1863 extraction slice and is not program-final. Java may continue in parallel; Node does not trigger capstone.
- mini-kv has only its own Round 2 planning changes. It may continue in parallel and is not a Node pre-approval dependency.
- The pre-existing Java final-push review-note edit in this Node worktree is unrelated and must remain unstaged.

## Requirement-evidence matrix

| Requirement | Implementation | Reproducible evidence | State |
|---|---|---|---|
| Rank all 52 tracked families | `scripts/family-logic-census.mjs` | `npm run elegance:families -- --json` | complete |
| Triage the highest five | Top-five table and decision notes below | census JSON plus import/shape audit | complete |
| Pick two safe families or stop honestly | renderers + summary | exact importer and oracle surfaces | complete |
| Preserve every contract | no runtime source change in v2199 | focused, full, typecheck, lint, build, and static gates | complete |
| Keep sibling work independent | cross-project boundary above | read-only git status/log | complete |

## Ranked top five

Command: `npm run elegance:families -- --json`. The score is exactly the total unique formatting lines,
which equals `member count × average formatting lines`; sorting is score, then member count, then family.

| Rank | Family | Members | Avg. formatting lines | Score | Safe engine? |
|---:|---|---:|---:|---:|---|
| 1 | `src/services:renderers` | 8 | 238.00 | 1,904 | yes, selected for v2200 |
| 2 | `src/services:verification` | 98 | 13.47 | 1,320 | no, meaningful members are path/test pinned |
| 3 | `src/services:summary` | 15 | 79.00 | 1,185 | yes, selected for v2201 |
| 4 | `src/services:contract` | 16 | 59.13 | 946 | no, heterogeneous contracts and no internal-only member |
| 5 | `src/services:packet` | 15 | 57.87 | 868 | no, heterogeneous packets and no internal-only member |

The singular `src/services:renderer` family is deliberately not in the top five. Its authoritative AST
gate reports 245 total, 242 standardized, 3 valid composition-only waivers, and 0 non-waived members;
therefore its local formatting score is zero instead of the misleading 21,606 wrapper/config LOC.

## Consolidation decisions

### Selected 1: promotion renderer family

`opsPromotionArchiveBaseRenderers.ts` and `opsPromotionArchiveHandoffRenderers.ts` have no direct test
import and are re-exported only by the stable `opsPromotionArchiveRenderers.ts` barrel. v2200 can place
the shared line/section behavior in `promotionMarkdownEngine.ts`, define the existing public functions
once in the stable barrel, and delete both internal modules. Expected result: family 8 -> 6, services
1,125 -> 1,124, and duplicated long export debt removed rather than relocated. Oracle surface: every
promotion archive/handoff Markdown function plus its existing focused tests; pre/post body digests must
match in mixed, LF, and CRLF materializations before push.

### Rejected: verification family

The 98-member suffix bucket mixes upstream echo, archive proof, live smoke, deployment, and receipt
verification. Exact AST shape finds five re-export-only shims and one two-member archive pair; the shims
own no formatting, while the meaningful pair and archive clusters are directly test/path pinned. The
only non-test-imported member has no second internal partner. An engine here would either preserve all 98
files (no family shrink) or remove a pinned module path. Both violate the brief.

### Selected 2: readiness summary family

V6-V13 retain their directly tested module paths, but repeat the same header, record, category, message,
endpoint, action, join, and fallback grammar. V5 is consumed through the stable HTTP route rather than a
direct test import. v2201 can introduce `readinessMarkdownEngine.ts`, keep V6-V13 as data/config wrappers,
move V5 behind a short internal case API, and delete `productionReadinessSummaryV5.ts`. Expected result:
family 15 -> 14 while HTTP paths and all V5-V13 response bytes stay fixed. Oracle surface: JSON and
Markdown for readiness-summary V5 through V13 under a fixed clock, across mixed/LF/CRLF.

### Rejected: contract and packet families

The 16 contracts cover unrelated identity, JWKS, audit, rollback, connection, and execution boundaries;
the 15 packets cover unrelated approval, CI, runtime smoke, read-window, and receipt workflows. The import
audit found no internal-only member in either family, and normalized AST shapes found no duplicate cluster.
Treating their shared nouns as shared behavior would add indirection without deleting formatting code.

## Selected execution order

1. v2200 promotion renderer engine: highest score, strongest internal deletion boundary, saves one service.
2. v2201 readiness summary engine: uses that service-count headroom and closes at the three-version cap.

No third family version is authorized. Both versions must shrink family and name baselines in their own
commit; failure to produce either shrink means that family version reverts instead of becoming a partial win.

## Local verification

- Focused family/elegance/renderer gate: 3 files / 15 tests passed. The printed renderer regressions are
  intentional negative tests that lower the allowed maximum from 3 to 2.
- Documentation quality: the first run correctly rejected 2,461 Chinese characters; after adding metric
  limits, version contracts, and adversarial review, both walkthrough quality files passed all 8 tests at
  3,471 Chinese characters.
- Full Vitest JSON reporter: 1,133/1,133 suites and 1,709/1,709 tests passed, zero failures.
- Typecheck and build passed; lint returned 0 errors / 261 budgeted warnings; security scanned 8,211 text
  files with 6/6 narrow waivers and 18/18 config checks.
- Elegance remained 4,549 names / 52 tracked families; renderer remained 242 standardized + 3 valid
  composition waivers / 0 non-waived; source-size remained 0 files over 800 lines.
- Final archive retention passed at 7,062 files / 62.83 MiB of 80 MiB. Local HTTP smoke is not applicable
  because v2199 changes no runtime or route; the existing remote workflow still runs safe smoke.

## Failure conditions

- Counting declarative renderer specs as formatting algorithms invalidates the ranking.
- Choosing a family whose shrink requires a test-imported or public module path to disappear invalidates the selection.
- Treating a re-export-only duplicate shape as meaningful formatting duplication invalidates the selection.
- Loosening either elegance baseline, editing an existing expectation, or changing a route/report byte invalidates the version.
