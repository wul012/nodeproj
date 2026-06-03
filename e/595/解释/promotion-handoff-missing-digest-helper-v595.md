# v595 Promotion handoff missing digest helper

## Purpose

v595 is version 14 of the 16-version maintenance/refactor run.

After v594 split each handoff artifact builder into a dedicated module, the same verification fallback digest construction appeared in package, certificate, receipt, closure, and completion verification code.

## Change

Added `src/services/opsPromotionArchiveHandoffVerificationDigests.ts`.

The new helper:

- `missingHandoffVerificationDigest(name: string)`.

It centralizes the existing fallback digest shape:

- algorithm: `sha256`;
- value: `digestStable({ missing: name })`.

Five handoff builder modules now call this helper instead of rebuilding the same object inline.

## Maintenance impact

This reduces duplicated verification mechanics across the artifact modules and gives future verification changes one place to update if the missing-item fallback convention evolves.

The behavior is unchanged. The helper preserves the same stable digest input and result shape used before v595.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: identical fallback digest construction was duplicated after the artifact modules were split.

Java and mini-kv remain recommended parallel work. v595 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

CI note:

- v595 is part of the next batched maintenance push. GitHub `Node Evidence` will run after the batch is accumulated.
