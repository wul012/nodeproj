# v597 Promotion handoff builder barrel contract

## Purpose

v597 is version 16 of the 16-version maintenance/refactor run.

After v589-v596 split the large promotion handoff builder into dedicated artifact modules and shared helper code, the remaining risk is accidental breakage of the old public import path.

v597 adds a focused contract test for that public barrel.

## Change

Added `test/opsPromotionHandoffBuilderBarrel.test.ts`.

The test verifies that `src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports the same function references as the dedicated modules:

- package builders;
- certificate builders;
- receipt builders;
- closure builders;
- completion builders.

## Maintenance impact

The old handoff builder path can remain stable while implementation stays split by artifact boundary. Future work can modify artifact modules without accidentally dropping a barrel export used by routes, profile builders, or bundle exports.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: the final split left a thin barrel that needed a narrow compatibility test.

Java and mini-kv remain recommended parallel work. v597 is Node-only test/maintenance coverage and requires no fresh sibling evidence.

## Verification

- `npm.cmd test -- test\opsPromotionHandoffBuilderBarrel.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- promotion group: 19 real `test/opsPromotion*.test.ts` files via `rg --files`

Result:

- Barrel contract test passed: 1 file, 5 tests.
- Typecheck passed.
- Build passed.
- Promotion group passed: 19 files, 50 tests.

CI note:

- v597 closes the local optimization batch. GitHub `Node Evidence` should run when v593-v597 are pushed together.
