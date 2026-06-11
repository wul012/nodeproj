# Node v2097 roadmap: production shard execution external artifact quarantine envelope

## Goal

Define the quarantine envelope that captures provenance and conflict metadata while preventing unverified artifacts from authorizing execution.

## Necessity Proof

- Blocker resolved: v2096 classifies conflicts but does not define the quarantine handling sequence.
- Later consumer: preflight closeout can prove that unverified artifacts have a bounded, non-authoritative path.
- Reuse decision: keep quarantine as metadata and conflict handling inside the readiness route chain.
- Growth stop condition: add another quarantine envelope only when a real artifact needs a new quarantine outcome.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can continue receipt work; Node v2097 does not require live service startup or sibling state mutation.

## Engineering Requirements

- Record provenance metadata, attach conflict class, seal non-authoritative digest, notify owning reviewer, and block production authority.
- Ensure quarantined artifacts cannot satisfy approval, store, or owner-receipt blockers.
- Keep Node read-only and avoid Java or mini-kv lifecycle control.
- Keep production execution blocked.

## Verification

Run focused readiness and route catalog tests, typecheck, build, HTTP smoke, and archive v2097 evidence under `e/2097/evidence` with explanation under `f/2097/解释`.
