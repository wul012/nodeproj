# v1321 controlled read-only shard preview signed approval artifact draft text package comparison acceptance precheck closeout roadmap

## Scope

Node v1312-v1321 adds a read-only comparison acceptance precheck after Node v1311 text package comparison preflight. The batch turns the twenty-five comparison lanes and acceptance controls into ten higher-level acceptance checkpoints and ten guards, so later work can require compared package evidence without treating comparison as acceptance.

## Necessity proof

- Blocker resolved: v1311 proved what must be compared, but there was no compact typed precheck that says what must still be absent before any compared package can be accepted.
- Later consumer: a future Node version can consume these ten checkpoints before evaluating manually compared package evidence, approval-grant review evidence, or archive closeout evidence.
- Existing report reuse decision: the comparison preflight intentionally lists lane/control detail; it should not also become the acceptance-precheck summary, otherwise route/profile consumers would need to know every low-level lane family.
- Stop condition: this chain stops at precheck checkpoints and missing-evidence guards. It must not parse signed draft text, parse detached signature payloads, capture approval grants, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling evidence through established fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval. If those projects continue, they can treat this as read-only downstream consumer context.

## Version map

- v1312: source comparison preflight readiness checkpoint and guard.
- v1313: identity and request metadata acceptance checkpoint and guard.
- v1314: digest binding and digest recheck acceptance checkpoint and guard.
- v1315: detached signature envelope acceptance checkpoint and guard.
- v1316: source evidence handle acceptance checkpoint and guard.
- v1317: operator value handle acceptance checkpoint and guard.
- v1318: policy and review-state acceptance checkpoint and guard.
- v1319: execution lock acceptance checkpoint and guard.
- v1320: approval grant review separation checkpoint and guard.
- v1321: archive closeout acceptance checkpoint and final guard summary.

## Verification plan

Run typecheck, focused comparison acceptance precheck tests, v1311 comparison preflight tests, route/barrel/catalog tests, build, HTTP smoke, archive integrity checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.
