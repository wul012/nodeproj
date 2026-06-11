# Node v2098 roadmap: production shard execution real artifact intake preflight closeout

## Goal

Close v2094-v2098 as a real-artifact intake preflight batch while explicitly requiring a verified external artifact before further Node-only growth.

## Necessity Proof

- Blocker resolved: v2094-v2097 now cover closed switch, provenance fields, conflict taxonomy, and quarantine envelope.
- Later consumer: the next meaningful version should consume at least one verified real external artifact.
- Reuse decision: close the batch with the shared readiness profile instead of inventing a second closeout ledger.
- Growth stop condition: stop Node-only artifact-intake preflight growth until a real external artifact exists.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They should continue producing real signed owner receipts; Node v2098 is not a pre-approval blocker and does not start or stop sibling services.

## Engineering Requirements

- Consume v2094 through v2097 as ordered sources.
- Keep the batch `preflightOnly=true` and `productionAuthority=false`.
- Name the next required event as at least one verified real external artifact arriving.
- Preserve `e/<version>/evidence`, `f/<version>/解释`, and only create `f/<version>/图片` when actual image evidence exists.

## Verification

Run focused readiness and route catalog tests, typecheck, build, HTTP smoke, and archive v2098 evidence under `e/2098/evidence` with explanation under `f/2098/解释`.
