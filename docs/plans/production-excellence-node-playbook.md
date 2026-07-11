# Production Excellence — Node Playbook (orderops-node)

Executes the standard in `docs/plans/production-excellence-program.md` for
`D:\nodeproj\orderops-node`. One milestone ≈ one or a few versions, each with
normal version closeout (walkthrough, archive artifacts, commit).

Verified starting facts (2026-06-12): CI exists (`.github/workflows/node-evidence.yml`:
npm ci, typecheck, test, build, safe smoke). No lint script, no ESLint/Prettier
configs. No coverage tooling. `package.json` test script passes
`--testTimeout=180000` which overrides `vitest.config.ts` (30000) — CLI wins, so
plain `vitest run` behaves differently from `npm test`. Safe defaults verified:
`UPSTREAM_PROBES_ENABLED`/`UPSTREAM_ACTIONS_ENABLED`/`ACCESS_GUARD_ENFORCEMENT_ENABLED`
all default false (src/config.ts ~lines 260–263), `AUTH_TOKEN_SECRET` defaults
empty, auth mode rehearsal/disabled. Graceful shutdown present (src/server.ts),
client timeouts present (AbortController in orderPlatformClient, socket timeout
in miniKvClient), no retries. package.json version 0.1.0 vs git tag v2114.
Largest files: src/ui/dashboardClientScript.ts (~1080 lines),
src/services/productionReadinessSummaryV4.ts (~929), three more 890–905.

## Milestone N0 — quick wins (1 version)

1. **Unify test timeout**: set `testTimeout: 180_000` (and matching
   `hookTimeout`) in `vitest.config.ts`; change package.json test script to
   plain `vitest run`. Result: `npm test` and direct `vitest run` agree.
2. **Adopt ESLint (flat config) with typescript-eslint recommended rules.**
   - `npm i -D eslint @eslint/js typescript-eslint`
   - `eslint.config.js` covering `src/**` and `test/**`; start with
     `recommended` (NOT type-checked rules yet — 1,216 files); disable stylistic
     rules; no Prettier repo-wide reformat (program hard rule 4).
   - Add `"lint": "eslint src test"` to package.json scripts.
   - Expect many legacy findings: commit the config with
     `--max-warnings` unset, and add an `eslint.baseline` approach instead:
     turn any rule producing >50 legacy errors to `"warn"` in the config with a
     `// ratchet: fix in N5` comment. Errors must be zero; warnings are the
     ratchet pool.
3. **CI**: add `npm run lint` step to node-evidence.yml after typecheck.
4. Version closeout per AGENTS.md.

Gate: CI green including lint; `npm test` time budget unchanged.

## Milestone N1 — renderer consolidation (ALREADY ACTIVE)

This is the existing v2114 plan (`docs/plans/v2114-codex-migration-playbook.md`,
batch 1 committed and tagged as `v2114` / `0441f85a`). Continue the batches exactly as written there.
N2–N4 may interleave with N1 batches; N5 must wait until N1 finishes.

## Milestone N2 — coverage (1 version)

1. `npm i -D @vitest/coverage-v8`; add `"test:coverage": "vitest run --coverage"`.
2. Configure coverage in vitest.config.ts: provider v8, include `src/**`,
   reporters text + html (html output gitignored).
3. Run once to measure the real baseline, then set thresholds at measured
   values minus 2 points (floor, never lowered; raise opportunistically).
4. CI: run coverage in node-evidence.yml (replace plain test step) and fail on
   threshold breach.

Gate: coverage runs in CI with committed thresholds; document the baseline
number in this file's progress table.

## Milestone N3 — boundaries, release discipline (1 version)

1. **docs/PRODUCTION_BOUNDARIES.md**: one authoritative list of everything
   intentionally NOT production, with file evidence: upstream probes/actions
   default-off, access guard observe-only, auth rehearsal headers untrusted,
   managed audit adapter `managed-unimplemented`, IdP JWKS never fetched
   (rehearsal fixture only), in-memory audit store default, all
   `executionAllowed: false` profiles. Plus the checklist of what would have to
   change (and be approved) for real production.
2. **CHANGELOG.md**: start at v2113/v2114; one line per version going forward
   (mirror the commit subject). Backfill only the last 10 versions.
3. **Version coherence**: set package.json version to `2114.0.0`-style or
   document in CHANGELOG.md that package.json stays 0.1.0 and git tags are the
   real version. Pick one policy and write it down — coherence, not ceremony.
4. **fixtures/MANIFEST.md**: list which upstream versions each frozen fixture
   under `fixtures/historical/sibling-workspaces/` covers, and mark all of them
   load-bearing/frozen.

Gate: docs exist, claims carry file evidence, CHANGELOG wired into the version
closeout convention (AGENTS.md note added).

## Milestone N4 — observability (1–2 versions)

1. **Metrics endpoint** `/api/v1/metrics` (JSON): per-client (order-platform,
   mini-kv) request counts, error counts, timeout counts, and latency
   p50/p95/p99 from an in-memory ring buffer. Instrument
   `src/clients/orderPlatformClient.ts` and `src/clients/miniKvClient.ts`.
   No new dependencies.
2. **Request log correlation**: Fastify already assigns req ids (genReqId);
   ensure the global error handler and audit entries include the request id.
3. Smoke-test both in the existing CI smoke step.

Gate: metrics endpoint returns sane JSON in CI smoke; new tests cover the
latency aggregation math.

## Milestone N5 — code health (after N1 completes)

1. Reproduce the source-size census from the current tree; historical estimates
   never override the scanner result.
2. Commit a shrink-only baseline and ratchet that reject unknown oversized
   files, growth, stale entries, duplicate/invalid debt, and count regressions.
3. Split every file above 800 lines behind its existing public facade. Prefer
   `src/contracts`, `src/evidence`, `src/runtime`, and existing route owners so
   the service/route growth ratchets do not need to rise.
4. Prove contract preservation with focused/full tests, typecheck, build,
   renderer census, and byte/AST parity where simple route coverage is weaker.
   Existing expectations and frozen fixtures are never edited to make a split
   pass.
5. Keep lint at or below the N0 263-warning baseline and remove cheap warnings
   encountered in touched files. The final track closeout audits the remaining
   warning pool separately; N5 does not mix a repository-wide lint rewrite into
   source ownership changes.

Gate: zero source files above 800 lines, empty remediation baseline, no source
size waiver, service/route counts at or below 1125/80, complete local suite and
CI green, then external N5 review before Phase 3.

## Deviations

(record here when reality contradicts an instruction)

- 2026-06-14 (v2143): the v2142 closeout claimed the "pure-standard with tests"
  renderer subset was empty. The shape buckets (for-loop / h3 / map / flatMap)
  were correct, but the with-tests/without-tests split used a flawed detection
  that only matched test files importing the `...Renderer.ts` module directly.
  This repo's report tests import the stable-entry barrel (which re-exports both
  `loadXxx` and `renderXxxMarkdown`) and do not import the Renderer module, so
  barrel-only-tested renderers were misclassified as testless. Corrected
  detection matches the barrel/report stem. True state after v2143: of 109
  unmigrated renderers, exactly 1 pure-standard-with-tests remains (the async
  `MinimalShardReadinessLiveReadGate`, due v2144) and 0 are genuinely testless.

## Progress

| Milestone | Version(s) | State | Evidence |
| --------- | ---------- | ----- | -------- |
| N0 | v2115 | completed | ESLint flat config, 0 errors / 263 warnings baseline; package test script now plain `vitest run`; Vitest config and 497 explicit test timeouts unified at 180s; CI lint step added; full local closeout passed |
| N1 | v2114-v2186 | complete; external N1-close review PASS | Final census: 245 total, 242 standardized, 3 AST-validated composition-only waivers, 0 non-waived unstandardized. Mechanical gates: `scripts/renderer-census.mjs`, `docs/plans/renderer-consolidation-waivers.json`, `test/rendererCensusScript.test.ts`. Closeout/CI portability evidence: `d/2184/evidence/renderer-consolidation-n1-closeout-v2184-summary.json`, `d/2186/evidence/renderer-parity-evidence-metadata-portability-v2186-summary.json`. |
| N2 | v2116, v2190 ratchet | completed | Vitest v8 coverage enabled in `npm run test:coverage`; CI runs coverage. v2190 raises the shrink-only floors to statements 94%, branches 86%, functions 97%, lines 94%; final actuals are recorded in `node-track-final-evidence.md`. |
| N3 | v2117 | completed | `docs/PRODUCTION_BOUNDARIES.md`, `CHANGELOG.md`, `fixtures/MANIFEST.md`, AGENTS changelog closeout rule, and `test/productionExcellenceDocs.test.ts` |
| N4 | v2118 | completed | `/api/v1/metrics`, `UpstreamMetricsRegistry`, order-platform / mini-kv client instrumentation, request-id error correlation, access-policy coverage, metrics CI smoke, and latency aggregation tests |
| N5 | v2187-v2189 | complete; external N5 review PASS | Fresh census corrected the historical estimate from 5 to 16 files over 800 lines. Three contract-preserving batches reduced 16 -> 10 -> 4 -> 0 with no waivers; the empty baseline now rejects every future file over 800 lines. v2189 local gates: 1234 files scanned, 546 test files / 1662 tests passed, lint 0 errors / 261 warnings, service/routes 1125/80, and unchanged renderer census. Evidence: `docs/plans/node-n5-close-evidence.md`; roadmap: `docs/plans/v2187-v2189-n5-source-size-health-roadmap.md`. |
| Track closeout | v2190 | complete; external E1-E10 closeout review PASS | E1-E10 evidence, tightened coverage/lint floors, security/config scan, archive-retention census, 550-file/1674-test coverage, build, HTTP/browser smoke, and docs honesty are green. `node-track-final-evidence.md` is authoritative. |
| Integration capstone | v2191-v2193 | external C1-C4 PASS; v2193 maintenance closeout | v2191 independently reproduced C1-C3; v2192 added the missing process-free aiproj artifact requirement and passed C1-C4 with all three upstream commits pinned. External review independently reproduced the live flow. v2193 applies the exact authorized read-only integration label and registers the one-command rerun as mandatory at Java final track close; production execution and Stage 2 remain blocked. |
