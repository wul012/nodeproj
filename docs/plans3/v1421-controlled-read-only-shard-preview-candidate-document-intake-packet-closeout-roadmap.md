# v1421 controlled read-only shard preview candidate document intake packet closeout roadmap

## Scope

Node v1412-v1421 adds the candidate document intake packet after Node v1411 candidate document submission precheck.

The new layer turns the submission precheck into ten intake slots and ten intake guards. It prepares the reviewed-real-document intake contract, but it does not accept a real document, does not import payloads, does not evaluate candidates, does not approve, does not sign, does not execute, does not write, and does not mutate sibling projects.

The aggregate reports `Node v1421`, source submission precheck `Node v1411`, ten intake slots, ten intake guards, twenty-five covered source checkpoints, twenty-five covered source validators, twenty carried candidate fields, thirty-five gates, and zero real/synthetic/staged/imported/evaluated/accepted/rejected documents or payloads.

## Necessity proof

- Blocker resolved: v1411 proved submission precheck readiness, but there was still no compact intake packet for a future reviewed real candidate document.
- Later consumer: future reviewed-real-document intake can consume the ten slots and guards directly before any payload import or evaluation is allowed.
- Existing report cannot be reused: the submission precheck is checkpoint-oriented. This version adds intake slot grouping, guard grouping, document-envelope placeholders, field carry-forward, archive closeout, and explicit no-material intake gates.
- Stop condition: this chain stops at intake packet preparation until a reviewed real compared package evidence candidate document is supplied as external material. Do not add another intake echo unless it consumes actual reviewed material.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1412-v1421 consumes the frozen v1411 Node submission precheck and historical sibling fallback path; it does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing read-only evidence handles, archive references, and eventual reviewed material contracts. Node is not a pre-approval blocker in this version range.

If live integration becomes necessary later, the plan must name the required upstream versions, startup ports, owners, and cleanup requirements before Node waits.

## Maintenance split

The implementation keeps five short files:

- intake packet types;
- intake packet catalog;
- intake packet builder;
- intake packet artifacts;
- intake packet renderer.

The type module catalog records these modules at orders 194-198 and moves the stable profile entry to order 199.

## Closeout checks

- typecheck
- focused intake/precheck/routes/barrel/type-catalog tests
- full test chunks before commit
- build
- HTTP smoke after build
- archive integrity for v1412-v1421 explanation and walkthrough files
- path length check for new short intake packet modules
- cleanup of .tmp, dist, and smoke server before final
