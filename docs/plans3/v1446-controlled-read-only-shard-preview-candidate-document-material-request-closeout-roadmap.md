# v1446 controlled read-only shard preview candidate document material request closeout roadmap

## Scope

Node v1422-v1446 adds the reviewed real candidate document material request package after Node v1421 candidate document intake packet.

The new layer turns the intake packet into twenty-five material request items and twenty-five material acceptance checks. It asks for the external human-reviewed material that a later stage may submit, but it does not accept a real document, does not import payloads, does not evaluate candidates, does not approve, does not sign, does not execute, does not write, and does not mutate sibling projects.

The aggregate reports `Node v1446`, source intake packet `Node v1421`, twenty-five request items, twenty-five acceptance checks, ten source intake slots, ten source intake guards, twenty requested material fields, forty gates, and zero real/synthetic/staged/imported/evaluated/accepted/rejected documents or payloads.

## Necessity proof

- Blocker resolved: v1421 prepared intake slots and guards, but there was still no explicit external-material request that tells a reviewer what must be supplied.
- Later consumer: future material intake can consume the twenty-five request items and checks before accepting any reviewed real candidate document.
- Existing report cannot be reused: the intake packet groups internal slots and guards. This version adds reviewer identity, source URI, digest, canonical body, field table, comparison binding, signature attestation, redaction log, absence attestations, archive index, and closeout request wording.
- Stop condition: this chain stops at the material request package until external reviewed real material is actually supplied. Do not add another request echo unless it consumes or verifies that external material.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1422-v1446 consumes the frozen v1421 Node intake packet and historical sibling fallback path; it does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing read-only evidence handles and archive references. Node is not a pre-approval blocker in this version range.

If live integration becomes necessary later, the plan must name the required upstream versions, startup ports, owners, and cleanup requirements before Node waits.

## Maintenance split

The implementation keeps five short files:

- material request types;
- material request catalog;
- material request builder;
- material request artifacts;
- material request renderer.

The type module catalog records these modules at orders 199-203 and moves the stable profile entry to order 204.

## Closeout checks

- typecheck
- focused material-request/intake/routes/barrel/type-catalog tests
- full test chunks before commit
- build
- HTTP smoke after build:
  - fake read-only source coverage keeps the v1446 material request package ready;
  - default closed-window smoke with `UPSTREAM_PROBES_ENABLED=false` must inherit the blocked v1411/v1421 source chain and keep material intake, payload import, evaluation, execution, and writes disabled.
- archive integrity for v1422-v1446 explanation and walkthrough files
- path length check for new short material request modules
- cleanup of .tmp, dist, and smoke server before final
