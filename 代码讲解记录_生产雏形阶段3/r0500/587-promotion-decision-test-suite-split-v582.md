# Node v582 code walkthrough: promotion decision test suite split

## Goal

v582 is the first maintenance-only version after the controlled read-only shard preview.

The goal is to reduce the largest immediate test-maintenance pain without touching production behavior. The old `test/opsPromotionDecision.test.ts` had 4494 lines and mixed five different review concerns in one suite. A failure anywhere in the promotion lifecycle forced readers to search through the whole file.

## New suite boundaries

`test/opsPromotionDecisionCore.test.ts` owns the decision core:

- blocked promotion review;
- promotion decision digest verification;
- evidence report rendering;
- ledger integrity.

`test/opsPromotionArchive.test.ts` owns the archive stage:

- archive bundle;
- archive manifest;
- manifest verification;
- archive attestation;
- attestation seal verification.

`test/opsPromotionHandoff.test.ts` owns the handoff stage:

- handoff package;
- handoff package verification;
- certificate;
- certificate verification;
- receipt;
- receipt verification;
- closure;
- closure verification;
- completion;
- completion verification.

`test/opsPromotionReleaseDeployment.test.ts` owns release and deployment:

- release evidence;
- release evidence verification;
- release archive;
- release archive verification;
- deployment approval;
- approval verification;
- deployment change record;
- change record verification;
- execution record;
- execution record verification;
- execution receipt;
- receipt verification;
- release audit trail.

`test/opsPromotionApprovedAndList.test.ts` owns the final review/list behavior:

- approved promotion review when local evidence is complete;
- newest-first listing and retrieval.

## Why this split is safe

The split preserves all original test bodies. Every original `it(...)` block was moved into one of the five files, and the total remains 34 tests.

There are no production imports, route registrations, service changes, catalog count changes, archive chain additions, or new upstream evidence requirements.

## Why this split matters

The original file hid too many concerns behind one filename. This made a test failure less informative than it should be: a release deployment failure, a handoff receipt failure, and a core decision ledger failure all looked like failures in the same giant suite.

The new structure makes future work sharper:

- focused reruns can target the broken lifecycle stage;
- future helper extraction can happen per stage;
- release/deployment and handoff can be split further without disturbing the decision-core tests;
- reviewers can validate behavior by route family instead of scanning thousands of unrelated lines.

## Verification

Focused verification passed:

```powershell
npm.cmd test -- test\opsPromotionDecisionCore.test.ts test\opsPromotionArchive.test.ts test\opsPromotionHandoff.test.ts test\opsPromotionReleaseDeployment.test.ts test\opsPromotionApprovedAndList.test.ts
```

Result:

- 5 files passed.
- 34 tests passed.

Broader promotion verification also passed:

```powershell
$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }
npm.cmd test -- @files
npm.cmd run typecheck
npm.cmd run build
```

Result:

- 7 promotion test files passed.
- 42 tests passed.
- Typecheck passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel while Node performs this maintenance run. v582 consumes no fresh sibling evidence and creates no approval gate for the sibling projects.
