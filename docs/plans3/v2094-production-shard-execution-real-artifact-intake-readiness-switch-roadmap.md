# Node v2094 roadmap: production shard execution real artifact intake readiness switch

## Goal

Add a closed real-artifact intake readiness switch that names the exact artifact kinds needed before production shard execution can move beyond dry-run evidence.

## Necessity Proof

- Blocker resolved: v2093 closed dry-run artifact intake but did not define the first real-artifact gate.
- Later consumer: a future verified artifact intake version can reuse the named artifact kinds without adding another dry-run envelope.
- Reuse decision: consume the v2093 closeout digest through the shared production shard execution readiness profile.
- Growth stop condition: do not open real artifact intake until provenance and conflict preflights exist.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can continue preparing real owner receipts while Node keeps this switch closed; Node v2094 is not a pre-approval blocker.

## Engineering Requirements

- Keep `realArtifactIntakeEnabled=false`.
- Name signed approval, managed audit owner binding, Java owner receipt, mini-kv owner receipt, and cleanup reconciliation receipt as required artifact kinds.
- Preserve `e/<version>/evidence` for machine evidence and `f/<version>/解释` for human explanation.
- Keep production execution blocked.

## Verification

Run focused readiness and route catalog tests, typecheck, build, HTTP smoke, and archive v2094 evidence under `e/2094/evidence` with explanation under `f/2094/解释`.
