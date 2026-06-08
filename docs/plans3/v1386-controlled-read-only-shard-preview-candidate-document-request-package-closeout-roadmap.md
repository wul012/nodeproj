# v1386 controlled read-only shard preview candidate document request package closeout roadmap

## Scope

Node v1372-v1386 adds a candidate document request package after Node v1371 compared evidence candidate intake preflight.

The package does not create, import, evaluate, accept, reject, approve, sign, execute, write, or mutate a real candidate document. It converts the v1371 intake slots and guards into fifteen request items and fifteen acceptance checks so a future real compared package evidence candidate document has an explicit request and review contract.

The aggregate reports `Node v1386`, source intake `Node v1371`, fifteen request items, fifteen acceptance checks, twenty requested candidate fields, thirty-eight gates, and zero real/synthetic/staged/imported/evaluated/accepted/rejected documents or payloads.

## Necessity proof

- Blocker resolved: v1371 required a real compared package evidence candidate document, but it did not define the request package that tells an operator or upstream producer exactly what to supply.
- Later consumer: future real-document intake can consume the fifteen request items and checks instead of re-deriving requirements from ten slots and ten guards.
- Existing report cannot be reused: v1371 is an intake preflight and guard model. This version adds request instructions, acceptance criteria, request item readiness, acceptance check readiness, and explicit freeze checks for missing, synthetic, unreviewed, imported, evaluated, approved, runtime, write, and sibling-mutation states.
- Stop condition: this chain stops at a request package until a reviewed real compared package evidence candidate document exists. Do not add another request echo unless it is consumed by a concrete document intake or shard preview execution path.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1372-v1386 consumes the frozen v1371 Node intake contract and historical sibling fallback path; it does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing durable read-only evidence handles, source lineage, operator provenance, digest lineage, signature envelope references, policy locks, approval separation, and archive closeout references. Node is not a pre-approval blocker for those projects in this version range.

If fresh upstream evidence is introduced later, Node should only wait when the next plan names the exact Java and mini-kv versions, the files or routes to consume, and the owner/port/cleanup requirements for live integration.

## Maintenance split

The implementation uses short filenames to avoid extending the already long v1371 candidate-intake paths:

- request types: item, check, gate, and package contracts;
- request catalog: fifteen declarative request/check templates;
- request builder: v1371 intake to request item/check mapping;
- request artifacts: gate aggregation, blocked reasons, digest, and package assembly;
- request renderer: archive Markdown rendering.

The type module catalog records these five modules at orders 184-188 and moves the stable profile entry to order 189.

## Closeout checks

- typecheck
- focused request/intake/routes/barrel/type-catalog tests
- build
- HTTP smoke after build
- full test chunks before commit
- archive integrity for v1372-v1386 explanation and walkthrough files
- path length check for new short request package modules
- cleanup of .tmp, dist, and smoke server before final

## Smoke note

When `UPSTREAM_PROBES_ENABLED=false`, the HTTP smoke route can expose the request package while the overall preview state is blocked. The smoke check should verify route presence, version, counts, state field presence, and blocked permissions; it should not hard-code the request package state as ready in disabled-probe mode.
