# Node v2209 Approval Boundary Echo Hotspot Repair

Date: 2026-07-20
Owner: Codex
State: local acceptance complete; commit/tag/push and remote closeout remain

## Objective and stop condition

Repair the 766-line approval-required boundary upstream echo hotspot without
changing its public loader/renderer path, profile field order, digest inputs,
JSON/Markdown bytes, fixtures, routes, safety decisions, or downstream results.
The version stops only when the target's five exact maintainability entries
disappear, no replacement debt appears, and the third similar echo split reuses
shared report mechanics instead of copying them again.

## Step-0 reconciliation and parallel projects

- Node started clean and pushed at commit `8c858eac`, tag `v2208`. Node Evidence
  run `29723132772` passed checkout, typecheck, zero-warning lint, security/config,
  archive, elegance, family, and maintainability gates, then failed only the v2208
  Markdown oracle in `Test`; build and smoke were skipped. Linux returned the
  26,245-byte canonical form while the expectation captured a 27,561-byte Windows
  form. v2209 owns the portability repair and does not rewrite tag `v2208`.
- Java is clean and pushed at `ccd1ca8a`; its latest tag is
  `v1872-order-platform-immutable-dto-boundary`. Java is recommended parallel.
  v2209 consumes only frozen Java v115 evidence and is not a Java approval gate.
- mini-kv is pushed at `e256ca3a`, tag `v1669`, with an independent v1670 atomic
  file-writer worktree in progress. mini-kv is recommended parallel. Node does
  not read those edits, modify that repo, or delete its `.tmp-v1670-baseline.txt`.
- Existing Java v115 and mini-kv v121 historical evidence remains read-only. No
  live capstone, sibling process, write permission, or execution authority is used.

## Necessity proof

- Blocker: `managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.ts`
  is 766 lines and owns five exact debts: one near-limit file; long functions at
  137/137/124 lines (`createChecks`, `createMiniKvV121Reference`, and the loader);
  and complexity 78 in `createChecks`.
- Consumers: CodeGraph identifies the audit route, the Node v275 implementation
  readiness review, and the later Node v281 upstream echo chain. They require the
  same public module, key order, digests, messages, and fail-closed behavior.
- Existing abstractions are reused: `historicalEvidenceReportUtils`,
  `liveProbeReportUtils`, the historical resolver, current types/renderer, and
  the maintainability ratchet. No service, route, fixture, schema, or authority is added.
- Growth stops after the five named baseline keys are stale and the shared report
  mechanics are consumed by the v2207, v2208, and v2209 echo facades/check modules.

## Third-instance elegance decision

The evidence schemas and boundary checks differ, so a generic domain engine would
hide meaning and is rejected. The repeated mechanics are narrower and real:

1. compute final readiness from all boolean checks except the ready field itself;
2. map failed declarative rules to blocker messages;
3. read historical files and JSON through the already-shared evidence utilities.

v2209 centralizes the first two in `liveProbeReportUtils`, directly tests them,
and migrates all three echo splits. Source parsing and domain checks remain data-
and behavior-specific modules.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| Freeze output before movement | fixed-time forced-fallback JSON/Markdown byte and SHA-256 oracle | red then green target test | passed; 38431-byte JSON and 37992-byte canonical Markdown frozen |
| Reuse third-instance mechanics | add tested readiness and failed-rule helpers; migrate v2207/v2208/v2209 | utility + three focused echo tests | passed; three oracle files / 15 tests |
| Separate source data | move constants plus Node v274, Java v115, and mini-kv v121 assembly to `approvalBoundaryReference.ts` | typecheck + local/fallback parity | passed; reference module 419 lines |
| Separate behavior | move ordered checks, echo projection, summary, and messages to `approvalBoundaryAssessment.ts` | byte oracle + downstream tests | passed; assessment module 395 lines |
| Tighten only | baseline must report exactly five stale entries and zero unknown/grown entries before edit | maintainability census | passed at 86/116/232/2 |
| Preserve ceilings | new modules live under `src/evidence`; services/routes remain 1125/80 | governance growth ratchet | passed at 1125/80 |
| Close safely | focused consumers, typecheck, lint, static gates, full suite/list, build, docs, smoke, commit/tag/push/CI | commands + archive | local acceptance passed; commit/tag/push/remote pending |

## New-file design note

- `approvalBoundaryReference`: data only; paths, frozen code catalogs, and Node/Java/mini-kv evidence assembly.
- `approvalBoundaryAssessment`: behavior only; ordered checks, echo projection, summary, blockers, warnings, and recommendations.
- `liveProbeReportUtils`: shared mechanics only; no version names, evidence paths, or domain policy.
- The public service stays the route-facing facade and owns final profile assembly.

## Execution sequence

1. Add direct tests for the two shared mechanics and a portable forced-fallback
   JSON/Markdown oracle to the untouched target. Record the red placeholder values.
2. Implement the helpers, migrate the existing v2207/v2208 echo modules, and prove
   both existing byte oracles remain unchanged.
3. Extract v2209 sources and checks. Preserve every object insertion order, fallback
   value, route, message, and ready-field position; repair implementation on drift.
4. Run the target, route, v275, and v281 consumer chain in local and forced-fallback
   modes. Run maintainability before touching its baseline.
5. Remove only the five stale baseline objects. Write Chinese explanation and a
   natural >=3000-Chinese-character walkthrough before final verification.
6. Run static gates, complete suite/list, build, guarded HTTP smoke, commit, tag,
   push, and inspect Node Evidence. Do not block-watch CI while useful local work remains.

## Executed evidence before final batch

- The untouched target produced exactly one expected red oracle test with four
  passing legacy tests. Its fixed-time forced-fallback values are JSON 38,431
  bytes / SHA-256 `120a8e1bcdb290673052a3b33dcce21fd8a71b4033ce9350bce1c489e223abac`
  and canonical Markdown 37,992 bytes / SHA-256
  `c86bf5b70675efe48d778ff2c037da24be470cafc760804bdb6cce42e8530db8`.
- The facade is 131 lines, the reference module is 419 lines, and the assessment
  module is 395 lines. The first source move briefly contained a terminal-output
  truncation marker; typecheck rejected it before any behavior test ran. Rebuilding
  the extraction from exact `git show HEAD:` ranges removed the corruption.
- The first maintainability pass found the five expected stale debts plus one new
  long mini-kv reference helper. Splitting that helper by evidence, details,
  receipt/source/review, and boundary fields removed the replacement debt. The
  second pre-baseline pass reported exactly five stale and zero unknown/grown keys.
- Removing only those five keys tightened the ledger from `87 / 119 / 233 / 2` to
  `86 / 116 / 232 / 2`. Focused target, downstream, route, maintainability, and
  governance coverage passes 8 files / 31 tests; typecheck and zero-warning lint
  pass. Security/config, elegance, all 52 tracked families, source-size, renderer,
  and governance gates also pass.
- The initial `approvalBoundaryEchoSources` / `approvalBoundaryEchoChecks` names
  accidentally formed third `sources` / `checks` file families. The final names
  describe their actual domain roles (`Reference` and `Assessment`), while the
  truly repeated readiness/rule mechanics moved into directly tested shared helpers.
- The same three-oracle run proves v2207 remains byte-stable and v2208/v2209 now
  share platform-independent normalization: 3 files / 15 tests pass. Complete
  build, HTTP smoke, and remote evidence still remain. Final documents
  pass 11 files / 42 tests; the walkthrough scores 100 at 3,647 Chinese characters,
  19 scannable H2 sections, a 221-character largest section, and zero padding,
  oversize, placeholder, or forbidden-execution signals.
- All 16 complete-suite shards pass at 568 files / 1,734 tests with at most two
  workers. The first outer loop exhausted its 60-minute command budget during
  shard 12 after shards 1-11 passed; this was a harness timeout, not an assertion
  failure. The orphaned shard-12 tree was stopped by its exact command line, then
  shard 12 passed alone at 35 files / 112 tests and shards 13-16 also passed.
  Independent `vitest list --json` discovery confirms 568 / 1,734. Archive
  retention passes at 7,103 files / 64.03 MiB.
- The first suite launch used a no-longer-built-in `basic` reporter; Vitest rejected
  it at startup before any test ran. Removing the display-only option produced the
  complete results above without changing timeout, assertions, or implementation.
- The final source tree builds. A guarded forced-fallback server at port 31209,
  PID 27808, returned health `200/93`, target JSON `200/40003`, and target Markdown
  `200/39564`. The profile was ready while `executionAllowed=false` and
  `connectsManagedAudit=false`; the owned PID was stopped and listeners returned to zero.

## Fail conditions

- Any changed field/key order, digest, byte/hash, route, fixture, safety boolean,
  historical fallback, message order, or downstream result fails the version.
- Any new/grown maintainability entry, service/route file, runtime import cycle,
  loosened ratchet, or copied third report mechanic fails the version.
- Editing an oracle, expectation, or historical fixture to accept extraction drift
  is forbidden. Restore the implementation instead.
- A screenshot is omitted unless an HTML/UI/renderable surface changes.
