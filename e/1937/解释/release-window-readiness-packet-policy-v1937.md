# Node v1937 - release window readiness packet policy split

## Focus

Move readiness checks, steps, forbidden operations, blockers, warnings, and recommendations into a policy module and verify the stable entrypoint.

## What changed

`releaseWindowReadinessPacketPolicy.ts` now owns the packet gates and operator-facing message construction. `releaseWindowReadinessPacket.ts` remains the public loader/renderer entrypoint and still re-exports the profile type for downstream imports.

## Verification

- Focused release-window packet and production release dry-run envelope tests passed.
- TypeScript project typecheck passed.

## Maintenance note

Future packet logic should choose the policy module for checks/messages, the evidence module for frozen sibling evidence, and the type module for shared shapes.
