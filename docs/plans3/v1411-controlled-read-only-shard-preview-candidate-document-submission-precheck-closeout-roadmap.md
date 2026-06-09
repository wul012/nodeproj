# v1411 controlled read-only shard preview candidate document submission precheck closeout roadmap

## Scope

Node v1387-v1411 adds the candidate document submission precheck after Node v1386 candidate document request package.

The new layer turns the request package into twenty-five submission checkpoints and twenty-five validators. It does not accept a real document, does not import payloads, does not evaluate candidates, does not approve, does not sign, does not execute, does not write, and does not mutate sibling projects.

The aggregate reports `Node v1411`, source request package `Node v1386`, twenty-five checkpoints, twenty-five validators, twenty requested candidate fields carried into the submission precheck, forty gates, and zero real/synthetic/staged/imported/evaluated/accepted/rejected documents or payloads.

## Necessity proof

- Blocker resolved: v1386 defined what to request, but not how a future reviewed real document submission should be prechecked before intake.
- Later consumer: future reviewed-real-document intake can consume the twenty-five checkpoint and validator records directly.
- Existing report cannot be reused: the request package is operator-facing request wording. This version adds submission checkpoint readiness, validator readiness, disabled-probe state handling, redaction and secret-value boundaries, runtime-payload absence, archive handoff, and closeout rules.
- Stop condition: this chain stops at submission precheck until a reviewed real compared package evidence candidate document is available. Do not add another precheck echo unless it is consumed by concrete document intake or shard preview execution.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1387-v1411 consumes the frozen v1386 Node request package and historical sibling fallback path; it does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing real read-only evidence handles and archive references. Node is not a pre-approval blocker in this version range.

If live integration becomes necessary later, the plan must name the required upstream versions, startup ports, owners, and cleanup requirements before Node waits.

## Maintenance split

The implementation keeps five short files:

- submission precheck types;
- submission precheck catalog;
- submission precheck builder;
- submission precheck artifacts;
- submission precheck renderer.

The type module catalog records these modules at orders 189-193 and moves the stable profile entry to order 194.

## Closeout checks

- typecheck
- focused submission/request/routes/barrel/type-catalog tests
- build
- HTTP smoke after build
- full test chunks before commit
- archive integrity for v1387-v1411 explanation and walkthrough files
- path length check for new short submission precheck modules
- cleanup of .tmp, dist, and smoke server before final
