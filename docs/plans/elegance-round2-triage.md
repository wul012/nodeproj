# Node Elegance Round 2 Family Triage

Date: 2026-07-12
Version: v2199 / E2-N1
State: v2199-v2200 complete and CI-green; v2201 local final gates and six-surface parity complete.

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

#### v2200 engine design note

- Abstraction: `promotionMarkdownEngine` owns document, field, section, item, bullet, digest, and optional-value grammar.
- Data boundary: `opsPromotionArchiveRenderers` keeps the 15 stable public functions and their exact field/section order.
- Behavior boundary: the engine adds only the separators and Markdown prefixes already duplicated by every renderer.
- Compatibility: the stable barrel path and all exported names remain unchanged; the two internal modules have no direct consumers.
- Size boundary: neither touched source file may exceed 800 lines, and no third promotion renderer file is introduced.
- Stop rule: any body digest, route byte, fixture, public import, family baseline, or name ratchet drift reverts the slice.

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

#### v2201 engine design note

- Abstraction: `readinessMarkdownEngine` owns V6-V13 document skeleton, entries, categories, messages, lists, values, and separators.
- Data boundary: V6-V13 keep their public paths and typed functions; each wrapper supplies title, optional status record, and category fields.
- V5 boundary: `productionReadinessCaseV5` keeps creation policy behind short route-only exports and uses the same low-level grammar.
- Compatibility: fixed-clock V5-V13 JSON plus Markdown raw bodies are frozen before migration; existing expectations never move.
- Capacity: v2200's one-file service headroom funds one engine plus one V5 case while deleting the old V5 summary module.
- Stop rule: summary family must shrink 15 -> 14 and name debt must shrink; any route, JSON, Markdown, fixture, or direct V6-V13 import drift reverts.

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

## v2200 execution checkpoint

- Stable public surface: all 15 archive/handoff functions remain exported from `opsPromotionArchiveRenderers.ts`.
- Shared behavior: `promotionMarkdownEngine.ts` owns document, field, section, item, bullet, digest, and optional-value grammar in 47 lines.
- Deleted duplication: the internal base and handoff renderer modules are gone; no source or test imported either path directly.
- Mechanical shrink: renderer family 8 -> 6, service files 1,125 -> 1,124, long-name debt 4,549 -> 4,538.
- Local byte gate: fixed clock, 15 route bodies, byte length plus SHA-256; the expectation was frozen on v2199 before source migration.
- Final local gate state: mixed/LF/CRLF each passed engine plus 15-route byte parity; full Vitest passed 1,137 suites and 1,712 tests; typecheck, lint, security, build, docs, source-size, archive, elegance, family, and renderer gates passed.

## v2201 execution checkpoint

- Stable modules: V6-V13 retain their existing files and exported function names; each now supplies only title, status record, and category signal data.
- Internal V5: `productionReadinessSummaryV5.ts` becomes `productionReadinessCaseV5.ts`; the route uses `loadV5Case` and `renderV5Case`, and no direct consumer existed.
- Shared behavior: the 148-line engine owns standard V6-V13 sections plus low-level document, entries, items, messages, list, value, and connection-field grammar.
- Mechanical shrink: summary family 15 -> 14, name debt 4,538 -> 4,537, formatting logic 1,185 -> 511; service files return 1,124 -> 1,125 without exceeding the original cap.
- Local byte gate: fixed clock, V5-V13, JSON plus Markdown, 18 raw payload length/SHA-256 pairs frozen on v2200 before migration and unchanged after it.
- Final local gate state: mixed/LF/CRLF each passed engine plus 18-route byte parity; full Vitest passed 1,141 suites and 1,716 tests; typecheck, lint, security, build, docs, source-size, archive, elegance, family, and renderer gates passed.
- Hard stop: this is the second family version and third Round 2 version. After commit/tag/push and green final CI, request external review; do not select another family.

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
