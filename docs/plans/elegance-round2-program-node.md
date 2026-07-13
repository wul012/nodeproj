# Node Elegance Round 2 — duplication engines, not renames (≤3 versions, bounded)

Executor: Codex session in `D:\nodeproj\orderops-node`. Authorized 2026-07-12.
SUBORDINATE to program close: if the Java track closes, pause at the next version
boundary, run the capstone rerun, and wait for the program-close review.

Why this shape: Round 1 (v2194–v2198) established that the remaining worst NAMES are
pinned by report contracts — more rename slices are low-value. The remaining
high-value elegance is STRUCTURAL: the census tracks 52 similar-file families and
v2197 consolidated exactly one (archive evidence). This round consolidates the next
worst duplication families into shared engines. Renames happen only incidentally.

Binding rules: AGENTS Elegance Gates; all hard rules (byte-identical outputs, frozen
fixtures, never edit existing test expectations); and the promoted portability rule —
any version touching parity utilities or oracles runs the SIX-SURFACE
(mixed/LF/CRLF) parity pass LOCALLY BEFORE pushing; a CI red of that class is a
closeout violation, not a discovery.

## E2-N1 — family triage (1 version, mostly read-only)

1. From `npm run elegance:census -- --json`, rank the 52 tracked families by
   (member count × per-member formatting-logic lines). For the top 5, write a one-page
   triage: consolidatable into an engine WITHOUT changing any report byte (yes/no,
   why), expected member-to-data conversion, and the oracle surfaces touched.
2. Commit the triage as `docs/plans/elegance-round2-triage.md`; pick the top 2
   consolidatable families. If FEWER than 2 families are safely consolidatable, record
   that honestly and close the program in this same version (aiproj E-A2 precedent —
   the budget is a maximum, not a quota).

## E2-N2 / E2-N3 — consolidate top families (1 version each)

1. Per family: build/extend the shared engine, land members as data/config; outputs
   byte-identical (existing tests + parity evidence cited); census family count and
   name baseline shrink in the same commit; six-surface parity pass BEFORE push if any
   parity surface is touched.
2. Hard stop after 2 family versions regardless of remaining families; request review.

## Cross-project progress

- Java: v1863/J73 is committed, tagged, clean, and CI-green, but direct root remains 174 against the 104 final target and no final-evidence/review artifact exists. Java is recommended parallel and Node is not its pre-approval blocker.
- mini-kv: v1661 is the latest committed/tagged boundary; its own Round 2 plan is uncommitted. mini-kv is recommended parallel and shares no files with this Node track.
- Capstone: not triggered. If Java reaches program-final while this track is active, Node pauses at the next version boundary and follows the capstone rule above.

## Version map and progress

| Milestone | Version | State | Evidence |
|---|---|---|---|
| E2-N1 family triage | v2199 | complete; commit/tag/push and Node Evidence CI green | commit `8dda347f`; run `29189927574`; 52 families ranked; full 1709/1709; top five audited |
| E2-N2 promotion renderer engine | v2200 | complete; commit/tag/push and remote CI green | commit `1c57de95`; run `29191299368`; mixed/LF/CRLF parity; full 1712/1712; family 8 -> 6 |
| E2-N3 readiness summary engine | v2201 | local final gates and six-surface parity complete; commit/tag/push/CI pending | V6-V13 paths stable; 18-body mixed/LF/CRLF gate; full 1716/1716; family 15 -> 14; formatting 1185 -> 511 |

Round 2 has reached its three-version hard cap. After v2201 is pushed and CI is green,
no fourth family is authorized; the next action is external review of v2199-v2201.

## Fail conditions

- Any report byte, route string, public module path, or frozen fixture changed = revert.
- A consolidation that adds indirection without deleting member formatting code = the
  waiver-standard test, inverted: revert.
- Pushing a parity-touching version without the recorded local six-surface pass = fail.
- Baseline or family count loosened = revert. Mixing in features or renames-for-their-
  own-sake = revert.

## Claude Round-2 review — 2026-07-13 (v2199–v2201): PASS — zero portability reds, program closed

- Verified by running the committed census: 4,537 names = baseline exactly, ready:true;
  three engines now consolidated across both rounds (archive-evidence, promotion
  renderer 8→6, readiness summary 15→14 with that family's formatting lines 1185→511);
  all three runs green; three-version hard cap respected.
- The promoted six-surface parity practice WORKED: every parity-touching version ran the
  mixed/LF/CRLF pass locally before pushing, and this is the first Node program since
  the renderer migrations with ZERO portability reds on master.
- Retro-elegance in Node is now closed alongside mini-kv's and aiproj's: remaining top
  names are report-contract data; remaining families are below the consolidation-value
  bar. Future elegance = the gates on new code. Node's next duty was the program-close
  capstone rerun — already executed by the reviewer (see PROGRAM CLOSE verdict).
