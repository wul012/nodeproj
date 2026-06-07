# Node v1036 controlled read-only shard preview operator evidence value supply signed approval template closeout roadmap

## Goal

Node v1012-v1036 adds a controlled read-only signed approval template preflight on top of the Node v1011 approval packet review package. This batch is intentionally thicker than the previous review package: it builds twenty-five required template fields, twenty-five rejection or non-execution clauses, a field-to-review-control mapper, a field-to-clause mapper, a separate validator, a digesting artifact builder, and a renderer. The package is ready for template preflight review, but it still does not capture a signature, grant approval, accept operator values, import evidence, build runtime payloads, start sibling services, route writes, or execute live reads.

## Cross-Project State

Read-only progress check before this Node batch:

- Node: D:\nodeproj\orderops-node was clean at Node v1011, commit f0a96026, tags v987-v1011 pushed and CI green.
- Java: D:\javaproj still has local Java v659 progress and untracked adapter-preflight files. Node v1012-v1036 does not consume those untracked files.
- mini-kv: no standalone mini-kv worktree is visible under D:\nodeproj or D:\ at this check. Node continues to consume frozen mini-kv v610 evidence through the existing draft/review chain.

Java and mini-kv are recommended parallel. Node v1012-v1036 does not ask them to wait, does not write their worktrees, and does not start their services. This batch consumes the committed Node v1011 review package and the frozen sibling evidence already bound through v986 and v1011.

## Necessity Proof

- Blocker resolved: v1011 proved review controls, but it did not define the actual signed approval template fields, missing-field blockers, rejection clauses, or non-execution clauses that a future capture preflight must enforce.
- Later consumer: the future signed approval capture preflight can require this template before it accepts a signature, operator identity, timestamp, approval reference, redacted digest, provenance binding, or approval grant semantics.
- Existing report cannot be reused: v1011 asks reviewer questions and checks policies; it does not produce a concrete template schema with field names, value classes, missing-field blockers, rejection codes, and clause-level execution locks.
- Growth stop condition: this chain stops at signed approval template preflight readiness. Capture preflight, value import, and execution must remain separate lifecycles.

## Version Thickness Rule

- v1012-v1015 define identity and time fields: packet id, operator identity, operator role, and approval timestamp.
- v1016-v1020 define source evidence bindings: review package digest, draft digest, source version, source file id, and source snippet id.
- v1021-v1022 define typed value and redacted digest fields.
- v1023-v1028 define policy fields: redaction, provenance, missing value, malformed value, signed approval, and draft-only packet policy.
- v1029-v1032 define justification and evidence coverage fields.
- v1033-v1035 define non-execution locks: no prior approval, zero value counts, and write/service/sibling mutation block.
- v1036 closes the template and limits the next step to signed approval capture preflight only.

Every slice has one SIGNED_APPROVAL_TEMPLATE_* field, one source v1011 review control binding, one missing-field blocker, one clause, one rejection code, read-only locks, zero values, and no capture/import/execution permission.

## Scope

- Add signed approval template types, field catalog, clause catalog, builder, validator, artifact builder, and renderer.
- Wire the template into the controlled read-only shard preview profile and Markdown route.
- Re-export the builder and renderer through the review artifact barrel.
- Register seven new modules in the type module catalog and update validation to Node v1036.
- Add focused tests for ready, blocked, renderer, profile, forced fallback, route, catalog, and barrel behavior.
- Add e/1012 through e/1036 explanations and code walkthroughs 1017-1041.

## Validation Plan

Batch validation is intentionally grouped:

- focused signed approval template test;
- typecheck;
- v1011/v1036/route/catalog/barrel adjacent batch;
- broader controlled-preview batch;
- build;
- HTTP smoke after build because the route surface changed;
- remote CI after push.

## Next Direction

The next layer can be signed approval capture preflight, not value import and not execution. That layer should consume this template, check identity/timestamp/signature shape, keep approval grant semantics disabled until explicitly modeled, and keep operator value supply blocked until a separate import preflight proves redaction, provenance, malformed-value rejection, cleanup, and rollback conditions.
