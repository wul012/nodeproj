# Node v1011 controlled read-only shard preview operator evidence value supply approval packet review closeout roadmap

## Goal

Node v987-v1011 adds a controlled read-only approval packet review package on top of the Node v986 approval packet draft. It turns the draft into twenty-five explicit review controls covering approval fields, policies, source evidence, execution locks, and closeout. The package is ready for human review, but it still does not capture approval, grant approval, accept operator values, import evidence, build runtime payloads, start sibling services, route writes, or execute live reads.

## Cross-Project State

Read-only progress check before this Node batch:

- Node: D:\nodeproj\orderops-node was clean at Node v986, commit 481da746, tags v962-v986 pushed and CI green.
- Java: D:\javaproj exists and has local Java v659 progress, but the worktree is ahead of remote by one commit and has untracked adapter-preflight files. Node v987-v1011 does not consume those untracked files.
- mini-kv: no standalone mini-kv worktree is visible under D:\nodeproj or D:\ at this check. Node continues to consume the frozen mini-kv v610 historical fixture already present in the Node repository.

Java and mini-kv are recommended parallel. Node v987-v1011 does not ask them to wait, does not write their worktrees, and does not start their services. This batch consumes the committed Node v986 draft and the existing frozen sibling evidence through that draft.

## Necessity Proof

- Blocker resolved: v986 declared approval fields and policies, but it did not turn them into review controls with reviewer questions, acceptance criteria, blocker codes, and field/policy coverage checks.
- Later consumer: the future signed approval template can require this review package before any signed approval capture, operator identity, timestamp, approval grant, or value import path opens.
- Existing report cannot be reused: the v986 draft proves evidence and policy declarations; it does not classify review controls, prove every control maps to a source draft slot, or count manual-review and auto-approval locks.
- Growth stop condition: this chain stops at review package readiness. The next lifecycle must be a separate signed approval template or capture preflight; this review package must not become a value importer.

## Version Thickness Rule

- v987-v993 define approval-field review controls: packet id, operator identity, timestamp, source evidence version, typed value shape, redacted digest, and project justification.
- v994-v1000 define policy review controls: signed human approval, draft-only no-grant, typed value envelope, fail-closed missing value, malformed reject, redact-before-persist, and source-evidence provenance.
- v1001-v1005 define source-evidence review controls: Java evidence, mini-kv evidence, Node envelope coverage, source draft digest, and historical fallback reviewability.
- v1006-v1010 define execution-lock review controls: no captured approval, zero value counts, runtime payload blocked, write/service/sibling mutation blocked, and operator supply blocked.
- v1011 closes the batch and records that the only safe next step is signed approval template design.

Every slice has one VALUE_SUPPLY_APPROVAL_REVIEW_* code, one source approval packet draft slot mapping, one reviewer question, one acceptance criterion, one blocker code, manual review required, auto approval blocked, no approval captured, zero supplied/accepted/imported values, and read-only execution locks.

## Scope

- Add approval packet review types, control catalog, slot builder, artifact builder, and renderer.
- Wire the review package into the controlled read-only shard preview profile and Markdown route.
- Re-export the builder and renderer through the review artifact barrel.
- Register five new modules in the type module catalog and update validation to Node v1011.
- Add focused tests for ready, blocked, renderer, profile, forced fallback, route, catalog, and barrel behavior.
- Add e/987 through e/1011 explanations and code walkthroughs 992-1016.

## Validation Plan

Batch validation is intentionally grouped instead of running CI after every slice:

- focused approval packet review test;
- typecheck;
- v986/v1011/route/catalog/barrel adjacent batch;
- broader controlled-preview batch;
- build;
- HTTP smoke after build because the route surface changed;
- remote CI after push.

## Next Direction

Do not start true shard execution yet. The stronger next layer is a signed approval template or signed approval capture preflight that consumes this review package, still keeps value import disabled, and only opens operator value supply after identity, timestamp, grant semantics, redaction digest, provenance binding, and malformed-value rejection are separately proven.
