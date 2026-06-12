# v2115 Production Excellence Node N0 Summary

## Scope

v2115 closes the Node N0 quick-win milestone from `docs/plans/production-excellence-node-playbook.md`.
It is an internal quality and CI governance version. It does not change any route contract, sibling-project evidence schema, approval rule, credential path, or execution boundary.

## What Changed

- `package.json` now runs `vitest run` directly for `npm test`.
- `vitest.config.ts` sets both `testTimeout` and `hookTimeout` to `180_000`.
- 497 explicit test-level timeout literals across 224 test files were unified to `180_000`, removing the old mismatch where local test arguments could override the global budget.
- `eslint.config.js` adds ESLint flat config with `@eslint/js` and `typescript-eslint` recommended rules.
- `package.json` adds `npm run lint`.
- `.github/workflows/node-evidence.yml` now runs lint after typecheck and before test.
- Small lint errors were fixed without changing business behavior; the remaining legacy lint pool is warning-only and documented for the N5 cleanup milestone.

## ESLint Baseline

- Files scanned: 1747
- Errors: 0
- Warnings: 263
- Warning rules:
  - `@typescript-eslint/no-unused-vars`: 257
  - `@typescript-eslint/no-explicit-any`: 6

The baseline is intentionally not hidden behind `--max-warnings`. CI can now fail on real lint errors while preserving a visible warning ratchet for the later code-health milestone.

## Verification

- `npm run lint`: passed with 0 errors and 263 warnings.
- `npm run typecheck`: passed.
- `npx vitest run test/workflowEvidenceVerification.test.ts test/governanceGrowthRatchet.test.ts -- --testTimeout=180000`: 2 files and 5 tests passed.
- `npm test`: 524 files and 1612 tests passed in about 511 seconds.
- `npm run build`: passed.
- Local HTTP smoke using `node dist/server.js`: `/health` returned ok, and `/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate` returned `readyForReleaseEvidenceArchive=true` with `executionAllowed=false`.

## Safety Boundary

The local smoke server ran with `UPSTREAM_PROBES_ENABLED=false` and `UPSTREAM_ACTIONS_ENABLED=false`. It was stopped after the smoke checks. This version only improves test, lint, and CI governance; it does not enable managed audit execution, real upstream probes, credential resolution, or cross-project live execution.

## Parallel Project Note

Java and mini-kv can continue in parallel. Their sessions read the Node-hosted playbooks as read-only material and track progress inside their own repositories. Node N0 is not a contract gate for either sibling project.
