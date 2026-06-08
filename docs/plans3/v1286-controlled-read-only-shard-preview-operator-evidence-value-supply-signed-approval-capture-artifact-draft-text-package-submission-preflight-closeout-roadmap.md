# v1286 controlled read-only shard preview signed approval artifact draft text package submission preflight closeout roadmap

## Scope

Node v1262-v1286 adds a read-only manual submission preflight after Node v1261 text package review preflight. The batch turns each ready review criterion into a submission slot and pairs each slot with an offline comparison control that rejects unsubmitted or uncomparable package material.

## Necessity proof

- Blocker resolved: v1261 proved the draft text package review criteria, but there was no typed submission surface that an operator could use before a signed approval draft text package is manually supplied.
- Later consumer: a future Node version can consume these submission slots and comparison controls to compare a manually submitted draft text package against digest pins, detached-signature metadata, source-evidence handles, operator value handles, policy assertions, and execution locks.
- Existing report reuse decision: the review preflight asks whether package material is reviewable; it intentionally cannot describe manual submission slots, compare unsubmitted material, or mark submitted package artifacts as accepted.
- Stop condition: this chain stops at submission slots and comparison controls. It must not parse signed draft text, parse detached signature payloads, capture approval grants, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling evidence through established fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval. If those projects continue, they can use this plan as read-only consumer context rather than a required gate.

## Version map

- v1262-v1265: identity and request/correlation submission slots.
- v1266-v1269: digest binding submission slots and digest comparison controls.
- v1270-v1272: detached signature envelope submission slots.
- v1273-v1275: source evidence submission slots.
- v1276-v1277: operator value handle binding submission slots.
- v1278-v1280: policy and review-state submission slots.
- v1281-v1285: execution lock, no-runtime, no-write, and no-sibling-mutation submission controls.
- v1286: archive closeout submission slot and final comparison-control summary.

## Verification plan

Run typecheck, focused submission/review preflight tests, route/barrel/catalog tests, controlled preview full-chain tests, build, HTTP smoke, archive integrity checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.