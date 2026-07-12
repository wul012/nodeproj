# Node Elegance Hotspot Program (E-track, 3–5 versions, bounded)

Executor: Codex session in `D:\nodeproj\orderops-node`. Authorized 2026-07-12 as the
sanctioned work while the Java track finishes; it runs in parallel and is SUBORDINATE to
the program close — when the Java track closes, pause this program at the next version
boundary, run the capstone rerun (`INTEGRATION_LIVE=1 npm run readiness:cross`) against
Java's final tag, and attach it to the program-close review before resuming.

Model: the Java maintainability program (v1834–v1837) — census first, shrink-only
budgets, top-N remediation, hard stop. This is NOT open-ended beautification: at most
5 versions, then stop and request review regardless of remaining debt.

Binding rules: AGENTS.md Elegance Gates section; all existing hard rules (byte-identical
outputs, never edit existing test expectations, frozen fixtures untouched, cleanup gate,
中文 walkthrough, commit/tag/push/green CI per version, ledger closes with the push).

## E-N1 — commit the mechanical gates (1 version, do this first)

1. Sweep the reviewer's uncommitted AGENTS.md Elegance Gates section into this version.
2. `scripts/elegance-census.mjs` (model: renderer census): reports every identifier-
   bearing filename and exported identifier under `src/` over 40 chars, plus file-count
   per structural family. `--json` is the number of record.
3. Committed shrink-only baseline (`docs/plans/elegance-baseline.json`) + a failing test:
   new violations fail, baseline may only shrink. Wire into CI in this version.
4. Record the baseline numbers in the version doc — that is the debt contract.

## E-N2..E-N4 — top-5 hotspot remediation (1–3 versions)

1. From the census, take the 5 worst NAME offenders whose names nothing external pins
   (no route string, no waiver manifest entry, no frozen fixture reference): extract the
   missing concept, rename file + identifier, update imports; outputs byte-identical,
   existing tests prove it. The 3 waived composition-only renderers are OFF LIMITS
   (their exact filenames are pinned by the waiver manifest).
2. From the census, take the worst remaining DUPLICATION family (if any survives the
   renderer consolidation): build/extend the shared engine, land members as data.
3. Every version shrinks the baseline; ratchet the baseline file in the same commit.

## E-N5 — close (1 version)

Final census recorded; baseline pinned at end state; one-page summary in the version
doc: debt start → end, what was deliberately left (with reasons). Request Claude review.

## Progress

| Milestone | Version | State | Evidence |
|---|---|---|---|
| E-N1 mechanical gates | v2194 | complete; committed, tagged, pushed, CI green | 4592 name violations, 52 tracked families; run 29178967561; `d/2194/evidence/elegance-gates-v2194-summary.json` |
| E-N2 top-5 names | v2195 | implementation complete; CI run 29180385904 exposed a cross-checkout oracle defect | 4562 name violations; local 559/1703; six files and 24 exports shortened; product behavior remained green |
| E-N2 parity repair | v2196 | local complete; commit/tag/push/CI pending | three checkout focused passes; 559/1704 full suite; unknown fingerprints fail closed |
| E-N3/E-N4 remediation | pending | not started | driven by census; skip duplication work if no reviewer-checkable shared behavior exists |
| E-N5 close | pending | not started | hard stop no later than fifth E-track version |

## Fail conditions

- Any route string, report byte, public module path, or frozen fixture changed = revert.
- A rename whose only proof is "tests still compile" — the full suite must pass and
  output-parity evidence must be cited = version invalid.
- Baseline loosened, or a violation waived instead of fixed without a written
  reviewer-checkable reason = fail.
- Running past 5 versions without a review = stop condition violated.
- Mixing elegance work with any feature or unrelated refactor = revert.
