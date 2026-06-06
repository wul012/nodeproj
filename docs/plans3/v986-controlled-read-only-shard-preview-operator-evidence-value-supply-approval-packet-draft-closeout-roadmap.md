# Node v986 controlled read-only shard preview operator evidence value supply approval packet draft closeout roadmap

## Goal

Node v962-v986 adds a controlled read-only value-supply approval packet draft. It consumes the completed Node v961 value supply envelope plus committed Java v658 and mini-kv v610 value-supply closeouts. The package prepares the shape of a future signed approval packet, but it does not capture approval, grant approval, accept operator values, import evidence, start sibling services, route writes, or execute live reads.

## Cross-Project State

Read-only progress check before this Node batch:

- Node: D:\nodeproj\orderops-node was clean at Node v961, commit ac759457, tags v937-v961 pushed and CI green.
- Java: D:\javaproj\advanced-order-platform was clean at Java v658, tag v658-order-platform-operator-evidence-value-supply-closeout-route.
- mini-kv: D:\C\mini-kv was clean at mini-kv v610, tag v610, with SHARDROUTEVALUESUPPLYJSON evidence packaged.

Java and mini-kv are recommended parallel. Node v962-v986 does not ask them to wait, does not write their worktrees, and does not start their services. Node only consumes frozen historical copies of the Java v658 and mini-kv v610 evidence needed for CI compatibility.

## Necessity Proof

- Blocker resolved: v961 had a value supply envelope, but it did not define the signed-human approval packet fields that must exist before any operator value can be supplied.
- Later consumer: the future value supply importer can require this draft before accepting a signed approval, operator identity, timestamp, redaction digest, provenance source, and typed value envelope.
- Existing report cannot be reused: v961 proves envelope readiness and zero value counts; it does not prove signed approval policy, missing and malformed value rejection, review record fields, or Java v658 / mini-kv v610 closeout consumption.
- Growth stop condition: this chain stops at approval packet draft readiness. The next real growth must be signed approval capture or value import, and only after a separate approval packet exists.

## Version Thickness Rule

- v962-v973 consume Java v658 closeout service, response, and assurance-test evidence.
- v974-v985 consume mini-kv v610 SHARDROUTEVALUESUPPLYJSON source and focused-test evidence.
- v986 closes the Node approval packet draft and ties it back to the Node v961 value supply envelope.

Every slice has a VALUE_SUPPLY_APPROVAL_PACKET_* code, one source value-supply envelope slot mapping, one evidence file id, one evidence snippet id, a signed-human approval policy, fail-closed missing value policy, malformed value rejection, redact-before-persist policy, source-evidence provenance policy, zero supplied/accepted/imported values, and read-only execution locks.

## Scope

- Add approval packet draft types, evidence fingerprints, policy catalog, slot builder, artifact builder, and renderer.
- Add frozen Java v658 and mini-kv v610 historical fixtures for forced fallback.
- Wire the approval packet draft into the controlled read-only shard preview profile and Markdown route.
- Re-export the builder and renderer through the review artifact barrel.
- Register six new modules in the type module catalog and update validation to Node v986.
- Add focused tests for ready, blocked, renderer, profile, forced fallback, route, catalog, and barrel behavior.
- Add e/962 through e/986 explanations and code walkthroughs 967-991.

## Validation Plan

Batch validation is intentionally grouped instead of running CI after every slice:

- focused approval packet draft test;
- typecheck;
- v961/v986/route/catalog/barrel/profile adjacent batch;
- broader controlled-preview batch;
- build;
- HTTP smoke after build if the route surface needs final confirmation;
- remote CI after push.

## Next Direction

Do not start true shard execution yet. The stronger next layer is signed approval capture and explicit value import preflight: operator identity, timestamp, approval grant, redacted digest, provenance binding, malformed value rejection, cleanup receipts, and then still no live execution until a separate live-read gate is proven.
