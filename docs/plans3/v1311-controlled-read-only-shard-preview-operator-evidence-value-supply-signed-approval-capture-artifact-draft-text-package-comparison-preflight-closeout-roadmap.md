# v1311 controlled read-only shard preview signed approval artifact draft text package comparison preflight closeout roadmap

## Scope

Node v1287-v1311 adds a read-only offline comparison preflight after Node v1286 text package submission preflight. The batch turns each ready submission slot into a comparison lane and pairs each lane with an acceptance control that rejects uncompared or unacceptable package material.

## Necessity proof

- Blocker resolved: v1286 prepared manual submission slots, but there was no typed offline comparison surface that could prove what must be checked before a submitted draft text package is ever accepted.
- Later consumer: a future Node version can consume these comparison lanes to compare a manually submitted package against digest pins, detached-signature metadata, source-evidence handles, operator value handles, policy assertions, and execution locks.
- Existing report reuse decision: the submission preflight declares where package material may be supplied; it intentionally cannot perform package comparison, acceptance control, or approval-grant review.
- Stop condition: this chain stops at comparison lanes and acceptance controls. It must not parse signed draft text, parse detached signature payloads, capture approval grants, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling evidence through established fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval. If those projects continue, they can treat this as read-only downstream consumer context.

## Version map

- v1287-v1290: identity and request/correlation comparison lanes.
- v1291-v1294: digest binding comparison lanes and digest recheck controls.
- v1295-v1297: detached signature envelope comparison lanes.
- v1298-v1300: source evidence comparison lanes.
- v1301-v1302: operator value handle binding comparison lanes.
- v1303-v1305: policy and review-state comparison lanes.
- v1306-v1310: execution lock, no-runtime, no-write, and no-sibling-mutation acceptance controls.
- v1311: archive closeout comparison lane and final acceptance-control summary.

## Verification plan

Run typecheck, focused comparison/submission preflight tests, route/barrel/catalog tests, controlled preview full-chain tests, build, HTTP smoke, archive integrity checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.