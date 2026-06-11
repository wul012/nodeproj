# Node v2088 roadmap: production shard execution external evidence closeout

## Goal

Close v2084-v2088 as the Node-side external-evidence precondition batch and clearly name the real artifacts still missing before production shard execution.

## Necessity Proof

- Blocker resolved: the Node side now has route catalog compatibility, signed approval schema, store preflight, and owner receipt request slots.
- Later consumer: the next meaningful version should intake a real external artifact, not add another internal readiness layer.
- Reuse decision: consume v2084-v2087 profile digests and shared renderer instead of adding a second closeout format.
- Growth stop condition: stop Node-only precondition growth until at least one required external artifact is actually received.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can follow the v2087 receipt request packet; Node v2088 is not a pre-approval blocker.

## Engineering Requirements

- Close the v2084-v2088 batch as precondition readiness only.
- Keep signed approval, managed audit store owner binding, Java receipt, mini-kv receipt, and cleanup reconciliation receipt listed as missing external artifacts.
- Preserve `readyForProductionShardExecution=false`, `executionAllowed=false`, and no sibling runtime lifecycle ownership.
- Store evidence under `e/2088/evidence` and explanation under `e/2088/解释`; do not create a shared screenshot/explanation folder.

## Verification

Run focused tests, typecheck, build, and HTTP smoke for the final v2088 JSON/Markdown route. Archive per-version evidence and explanations separately.
