# Node v2093 roadmap: production shard execution external artifact dry-run closeout

## Goal

Close v2089-v2093 as a dry-run artifact intake batch and stop Node-only growth until a real external artifact arrives.

## Necessity Proof

- Blocker resolved: Node has envelope, synthetic approval validation, store owner request, and unsigned receipt reconciliation.
- Later consumer: v2094 should consume at least one real external artifact, not another internal dry-run layer.
- Reuse decision: consume v2089-v2092 digests through the shared closeout profile shape.
- Growth stop condition: stop Node-only dry-run growth until at least one required real external artifact is received.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They should work toward real signed owner receipts; Node v2093 is not a pre-approval blocker.

## Engineering Requirements

- Close the batch as dry-run only.
- Keep real signed approval, managed audit owner binding, Java receipt, mini-kv receipt, and cleanup receipt listed as missing.
- Preserve the f-folder layout for explanations and images.
- Keep production execution blocked.

## Verification

Run focused tests, typecheck, build, HTTP smoke, and archive evidence under `e/2093/evidence` with explanation under `f/2093/解释`.
