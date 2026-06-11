# Code walkthrough - Node v1935

## Focus

Extract release-window readiness packet type ownership.

## Code reading notes

- `releaseWindowReadinessPacketTypes.ts` owns packet states, actors, messages, release-window steps, forbidden operations, sibling evidence reference shapes, and the public profile shape.
- `releaseWindowReadinessPacket.ts` imports those shapes and re-exports `ReleaseWindowReadinessPacketProfile` so existing downstream imports remain stable.
- Type-only imports keep runtime loading unchanged.

## Maintenance rule

New release-window packet structures should be added to the type module before runtime logic is extended.
