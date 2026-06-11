# Code walkthrough - Node v1936

## Focus

Extract frozen release-window sibling evidence.

## Code reading notes

- `releaseWindowReadinessPacketEvidence.ts` owns the Java v61 rollback approval fixture reference.
- The same module owns the mini-kv v70 restore drill reference.
- Endpoint constants moved beside the evidence catalog so loader and policy code can share stable names.

## Maintenance rule

Future frozen evidence updates should stay isolated in the evidence module and must not authorize runtime execution.
