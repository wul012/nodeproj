# Node v2096 roadmap: production shard execution external artifact conflict taxonomy

## Goal

Name the conflict classes that force external artifacts into quarantine instead of production authority.

## Necessity Proof

- Blocker resolved: v2095 defines provenance fields but does not specify contradiction handling.
- Later consumer: quarantine can attach a stable conflict class instead of carrying free-text rejection reasons.
- Reuse decision: represent conflict classes inside the existing readiness profile chain.
- Growth stop condition: add a new conflict class only when a real provider introduces a new contradiction mode.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can keep producing owner-receipt evidence; Node v2096 only defines how conflicts will be classified later.

## Engineering Requirements

- Include duplicate approval artifact, stale source readiness digest, owner receipt scope mismatch, managed audit store owner mismatch, and cleanup reconciliation missing.
- Default every conflict to quarantine and production block.
- Do not accept or persist artifact payloads.
- Keep production execution blocked.

## Verification

Run focused readiness and route catalog tests, typecheck, build, HTTP smoke, and archive v2096 evidence under `e/2096/evidence` with explanation under `f/2096/解释`.
