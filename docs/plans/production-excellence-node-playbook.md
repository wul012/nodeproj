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

1. Enable `noUnusedLocals` + `noUnusedParameters` in tsconfig.json; fix
   findings in batches.
2. Burn down the N0 warning ratchet pool to zero, rule by rule.
3. Split >800-line files (dashboardClientScript.ts, productionReadinessSummaryV4.ts,
   the three ~900-line managed-audit files) into focused modules.
   **Ratchet interaction**: splitting adds files, and `test/governanceGrowthRatchet.test.ts`
   caps src/services at the v2114 baseline. Therefore each split version must
   pair with at least as many Phase-B merges (folding fully-migrated
   `*Renderer.ts` files into their service files, updating route imports) so the
   net count stays at or below the ratchet. Lower the ratchet baseline as the
   count drops; never raise it.

Gate: zero ESLint warnings, no source file >800 lines (or a written waiver),
ratchet baselines strictly lower than at program start.

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
| N1 | v2114+, v2119-v2156 | batch 1 committed and tagged (`v2114` / `0441f85a`); batches 2-37 completed as v2119-v2156; v2145 completed as documentation-gate closeout repair (no new renderer migration); archive verification renderer subset now builder-backed; route catalog cleanup evidence/adjacent report families, four prerequisite-chain families, seven managed-audit credential-resolver report renderers, six runtime-shell governance reports, four adapter/provenance packet verification reports, the dry-run packet report, the disabled adapter client report pair, the audit-store foundational profile pair, four foundational governance reports, four deployment/identity boundary reports, five managed-audit/fake-transport standard-shape report renderers, five more standard managed-audit report renderers, three pure-standard sandbox-endpoint credential-resolver upstream-echo-verification renderers, three standard sandbox-endpoint-handle / approval-required renderers, the minimal shard readiness live-read gate (first `lines`-section migration), and twenty controlled-read-only-shard-preview compact h3/flatMap renderers migrated. PURE-STANDARD SUBSET NOW GENUINELY EMPTY (0 with tests, 0 testless after v2144); v2146 resolved the direction decision by extending builder spacing controls, v2147 centralized compact blocked-reason line rendering, v2148 centralized h3 evidence-file detail blocks plus compact trailing-blank carry, v2149 carried the same pattern through signed approval capture / artifact draft preflight renderers, v2150 carried it through artifact draft authoring readiness, instruction preflight, text package intake, text package review preflight, and text package submission preflight, v2151 carried it through text-package comparison / compared-evidence reports while adding empty-meta first-section and separated h3 block builder support, v2152 migrated the candidate document request/submission/intake/material full-report chain while deferring the adjacent profile-section fragment renderer, v2153 standardized eight profile-section fragment renderers with `renderProfileEntrySections` while leaving three composition-only profile-section renderers unchanged, v2154 standardized five production live-probe read-only-window `*MarkdownRenderer.ts` tail reports through `releaseReportShared`, and v2156 standardized eleven disabled-runtime-shell design/draft full-report renderers through the same release-report section helpers. Remaining unstandardized renderer files by broad standardized scan: 63 (counting `verificationReportBuilder`, `releaseReportShared`, and `renderProfileEntrySections`; the old 87 number was builder-only and no longer reflects release-report/profile-fragment standardization) | playbook progress table; `d/2119/evidence/renderer-consolidation-batch-2-v2119-summary.json`; `d/2120/evidence/renderer-consolidation-batch-3-v2120-summary.json`; `d/2121/evidence/renderer-consolidation-batch-4-v2121-summary.json`; `d/2122/evidence/renderer-consolidation-batch-5-v2122-summary.json`; `d/2123/evidence/renderer-consolidation-batch-6-v2123-summary.json`; `d/2124/evidence/renderer-consolidation-batch-7-v2124-summary.json`; `d/2125/evidence/renderer-consolidation-batch-8-v2125-summary.json`; `d/2126/evidence/renderer-consolidation-batch-9-v2126-summary.json`; `d/2127/evidence/renderer-consolidation-batch-10-v2127-summary.json`; `d/2128/evidence/renderer-consolidation-batch-11-v2128-summary.json`; `d/2129/evidence/renderer-consolidation-batch-12-v2129-summary.json`; `d/2130/evidence/renderer-consolidation-batch-13-v2130-summary.json`; `d/2131/evidence/renderer-consolidation-batch-14-v2131-summary.json`; `d/2132/evidence/renderer-consolidation-batch-15-v2132-summary.json`; `d/2133/evidence/renderer-consolidation-batch-16-v2133-summary.json`; `d/2134/evidence/renderer-consolidation-batch-17-v2134-summary.json`; `d/2135/evidence/renderer-consolidation-batch-18-v2135-summary.json`; `d/2136/evidence/renderer-consolidation-batch-19-v2136-summary.json`; `d/2137/evidence/renderer-consolidation-batch-20-v2137-summary.json`; `d/2138/evidence/renderer-consolidation-batch-21-v2138-summary.json`; `d/2139/evidence/renderer-consolidation-batch-22-v2139-summary.json`; `d/2140/evidence/renderer-consolidation-batch-23-v2140-summary.json`; `d/2141/evidence/renderer-consolidation-batch-24-v2141-summary.json`; `d/2142/evidence/renderer-consolidation-batch-25-v2142-summary.json`; `d/2143/evidence/renderer-consolidation-batch-26-v2143-summary.json`; `d/2144/evidence/renderer-consolidation-batch-27-v2144-summary.json`; `d/2145/evidence/renderer-consolidation-documentation-gate-closeout-v2145-summary.json`; `d/2146/evidence/renderer-consolidation-batch-28-v2146-summary.json`; `d/2147/evidence/renderer-consolidation-batch-29-v2147-summary.json`; `d/2148/evidence/renderer-consolidation-batch-30-v2148-summary.json`; `d/2149/evidence/renderer-consolidation-batch-31-v2149-summary.json`; `d/2150/evidence/renderer-consolidation-batch-32-v2150-summary.json`; `d/2151/evidence/renderer-consolidation-batch-33-v2151-summary.json`; `d/2152/evidence/renderer-consolidation-batch-34-v2152-summary.json`; `d/2153/evidence/renderer-consolidation-batch-35-v2153-summary.json`; `d/2154/evidence/renderer-consolidation-batch-36-v2154-summary.json`; `d/2156/evidence/renderer-consolidation-batch-37-v2156-summary.json` |
| N2 | v2116 | completed | Vitest v8 coverage enabled in `npm run test:coverage`; CI Test step now runs coverage; baseline/actual statements 95.81%, branches 87.38%, functions 98.38%, lines 95.77%; thresholds set to 93/85/96/93 after a two-point floor buffer |
| N3 | v2117 | completed | `docs/PRODUCTION_BOUNDARIES.md`, `CHANGELOG.md`, `fixtures/MANIFEST.md`, AGENTS changelog closeout rule, and `test/productionExcellenceDocs.test.ts` |
| N4 | v2118 | completed | `/api/v1/metrics`, `UpstreamMetricsRegistry`, order-platform / mini-kv client instrumentation, request-id error correlation, access-policy coverage, metrics CI smoke, and latency aggregation tests |
| N5 | — | blocked on N1 | |
