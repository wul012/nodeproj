# Node v2095 roadmap: production shard execution external artifact provenance preflight

## Goal

Define the provenance metadata required before any external artifact payload can be considered for real artifact intake.

## Necessity Proof

- Blocker resolved: v2094 names required artifact kinds but does not say how an artifact proves where it came from.
- Later consumer: real artifact intake can verify metadata before reading or retaining any payload.
- Reuse decision: keep this as a metadata-only profile rather than adding a new storage service.
- Growth stop condition: do not accept artifact payloads until conflict taxonomy and quarantine policy are both defined.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They should produce receipt metadata that can later populate these provenance fields; Node v2095 does not require them to finish first.

## Engineering Requirements

- Require artifact kind, external provider id, received-at, source readiness digest, signature or owner digest, retention class, and quarantine policy.
- Keep `realArtifactPayloadAccepted=false`.
- Persist no payload and read no credential or raw endpoint URL.
- Keep production execution blocked.

## Verification

Run focused readiness and route catalog tests, typecheck, build, HTTP smoke, and archive v2095 evidence under `e/2095/evidence` with explanation under `f/2095/解释`.
