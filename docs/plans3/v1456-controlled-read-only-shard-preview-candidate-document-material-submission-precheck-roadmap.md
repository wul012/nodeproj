# v1456 controlled read-only shard preview candidate document material submission precheck roadmap

## Scope

Node v1447-v1456 adds the reviewed real candidate document material submission precheck after Node v1446 candidate document material request package.

The new layer reads the v1446 request package, groups its twenty-five request items and twenty-five acceptance checks into ten submission checkpoints, and attaches ten validators. It proves that a later stage knows exactly which reviewed real material must be supplied before any candidate document material can enter the system.

This version range does not accept a real document, does not create a reviewed material payload, does not import runtime payloads, does not evaluate candidate material, does not approve, does not sign, does not execute, does not write, and does not mutate Java or mini-kv sibling state.

The aggregate reports `Node v1456`, source material request package `Node v1446`, ten checkpoints, ten validators, twenty-five source request items, twenty-five source acceptance checks, twenty required material fields, twenty submission material fields, forty-one gates, and zero real/synthetic/staged/imported/evaluated/accepted/rejected documents or payloads.

## Necessity proof

- Blocker resolved: v1446 asks for external reviewed real material, but there was no precheck layer that verifies the requested material shape before a future submission stage.
- Later consumer: a future material submission or intake package can consume the checkpoint and validator catalog before accepting reviewed real candidate document material.
- Existing report cannot be reused: the v1446 material request package describes what should be supplied. This layer describes how submitted material will be prechecked and which side effects remain blocked.
- Stop condition: this chain stops at the submission precheck. Do not add another echo unless it consumes actual reviewed real material or verifies a new externally supplied artifact.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1447-v1456 consumes the frozen Node v1446 material request package and does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing read-only evidence handles, archive references, and shard preview documentation. Node is not a pre-approval blocker for their current work in this version range.

If live integration becomes necessary later, the plan must name the required upstream Java and mini-kv versions, startup ports, process owners, environment variables, and cleanup responsibilities before Node waits on either project.

## Version split

- v1447 material source package submission checkpoint
- v1448 reviewer identity submission checkpoint
- v1449 document origin submission checkpoint
- v1450 digest and canonical body submission checkpoint
- v1451 field table submission checkpoint
- v1452 comparison binding submission checkpoint
- v1453 signature attestation submission checkpoint
- v1454 redaction and secret boundary submission checkpoint
- v1455 runtime and import freeze submission checkpoint
- v1456 closeout archive submission checkpoint and aggregate readiness

## Maintenance split

The implementation keeps five short files:

- material submission precheck types;
- material submission precheck catalog;
- material submission precheck builder;
- material submission precheck artifacts;
- material submission precheck renderer.

The type module catalog records these modules at orders 204-208 and moves the stable profile entry to order 209.

## Closeout checks

- typecheck
- focused material-submission-precheck/material-request/routes/barrel/type-catalog tests
- full test chunks before commit
- build
- HTTP smoke after build:
  - fake read-only source coverage keeps the v1456 material submission precheck ready;
  - default closed-window smoke with `UPSTREAM_PROBES_ENABLED=false` must inherit the blocked source chain and keep material submission, intake, payload import, evaluation, execution, writes, and sibling mutation disabled.
- archive integrity for v1447-v1456 explanation and walkthrough files
- path length check for new short material submission precheck modules
- cleanup of `.tmp`, `dist`, and smoke server before final
