# v1261 controlled read-only shard preview signed approval artifact draft text package review preflight closeout roadmap

## Scope

Node v1237-v1261 adds a read-only offline review preflight after Node v1236 text package intake. The batch turns each expected draft text package intake field into a review criterion and adds a matching rejection control for unreviewable package material.

## Necessity proof

- Blocker resolved: v1236 defined expected fields and intake guards, but there was no typed review preflight that a later offline reviewer could use before any draft text package is accepted.
- Later consumer: a future Node version can consume these criteria to compare a manually submitted draft text package against digest pins, detached-signature metadata, source-evidence handles, value handles, policy assertions, and execution locks.
- Existing report reuse decision: the text package intake report declares expected fields only; it intentionally cannot answer review questions, reject unreviewable criteria, or document separate-reviewer requirements.
- Stop condition: this chain stops at review criteria and rejection controls. It must not parse signed draft text, parse detached signature payloads, capture approval grants, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling evidence through established fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval.

## Version map

- v1237-v1240: identity and request/correlation review criteria.
- v1241-v1244: digest binding review criteria and digest recheck controls.
- v1245-v1247: detached signature envelope review criteria.
- v1248-v1250: source evidence review criteria.
- v1251-v1252: operator value handle binding review criteria.
- v1253-v1255: policy and review-state criteria.
- v1256-v1260: execution lock, no-runtime, no-write, and no-sibling-mutation review controls.
- v1261: archive closeout review criterion and final rejection-control summary.

## Verification plan

Run typecheck, focused review preflight tests, v1236 intake adjacency tests, route/barrel/catalog tests, controlled preview full-chain tests, build, HTTP smoke, archive integrity checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.