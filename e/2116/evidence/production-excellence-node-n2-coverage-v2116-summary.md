# v2116 production excellence N2 coverage summary

## Scope

- Service: orderops-node
- Version: v2116
- Milestone: N2 coverage
- Runtime behavior changed: no
- Upstream services started: no
- Evidence schemas changed: no
- Java / mini-kv status: recommended parallel; Node v2116 consumes only local CI and coverage evidence.

## Coverage Gate

`npm run test:coverage` now runs `vitest run --coverage` with the V8 provider, `src/**/*.ts` included, and `text`, `html`, `json-summary` reporters. The CI Test step now runs the same coverage command.

Measured full-suite baseline:

| Metric | Covered / Total | Actual | Threshold |
| --- | ---: | ---: | ---: |
| Statements | 27383 / 28580 | 95.81% | 93% |
| Branches | 29052 / 33246 | 87.38% | 85% |
| Functions | 11825 / 12019 | 98.38% | 96% |
| Lines | 26532 / 27702 | 95.77% | 93% |

The thresholds use the measured baseline minus roughly two points, floored to whole percent, so small runner variance should not make the first coverage gate flaky while real regressions still fail.

## Contract Fix

Changing the workflow from `npm test` to `npm run test:coverage` exposed one real contract gap: several CI evidence services still treated `npm test` as the only valid test command. v2116 updates the current command contract in:

- `.github/workflows/node-evidence.yml`
- `src/services/workflowEvidenceVerification.ts`
- `src/services/ciEvidenceCommandProfile.ts`
- `src/services/ciEvidenceHardeningPacket.ts`
- `src/services/managedAuditManualSandboxConnectionRehearsalGuard.ts`
- `test/nodeEvidenceWorkflow.test.ts`
- `test/dependabotConfig.test.ts`

Historical archive strings such as older walkthroughs containing `npm test -> ...` were not rewritten; they remain frozen evidence for older versions.

## Verification

- Focused chain: 9 files / 23 tests passed.
- Coverage: 524 files / 1612 tests passed, 621.61 seconds, thresholds passed.
- Typecheck: `npm run typecheck` passed.
- Lint: `npm run lint` passed with 0 errors / 263 warnings, preserving the N0 warning baseline.
- Build: `npm run build` passed.
- HTTP smoke: `/health`, workflow evidence JSON/Markdown, CI command profile, and release evidence readiness gate passed on `127.0.0.1:4190`; smoke PID 28680 stopped.

Vitest printed a worker shutdown timeout notice after the successful coverage summary. Because the command exited with code 0, all tests passed, and the build/smoke path passed afterward, this is recorded as a runner shutdown note rather than a business behavior failure.

## Next

N3 can proceed next: production boundary documentation, changelog/version policy, and frozen fixture manifest. Java and mini-kv do not need to wait on Node v2116.
