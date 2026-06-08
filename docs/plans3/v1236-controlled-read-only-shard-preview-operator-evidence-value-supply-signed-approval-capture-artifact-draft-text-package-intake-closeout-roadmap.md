# v1236 controlled read-only shard preview signed approval artifact draft text package intake closeout roadmap

## Scope

Node v1212-v1236 adds a read-only signed approval artifact draft text package intake contract after Node v1211 instruction preflight.

## Necessity proof

- Blocker resolved: v1211 could describe draft instructions, but there was no typed intake contract for a later manually authored draft text package.
- Later consumer: a future Node version can review an offline draft text artifact against these expected fields before any approval grant is considered.
- Existing report reuse decision: the older signed human approval artifact contract is a broader prerequisite contract and cannot bind the controlled shard preview instruction slots, digests, and execution locks now present in v1211.
- Stop condition: this chain stops at read-only expected fields and guard checks; it must not accept signed text, detached signatures, approval grants, runtime payloads, or sibling mutations.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling evidence through the established fixtures; Java and mini-kv do not need to wait for Node approval in this batch.

## Version map

- v1212-v1215: identity and request/correlation intake fields.
- v1216-v1219: digest binding intake fields.
- v1220-v1222: detached signature envelope intake fields.
- v1223-v1225: source evidence intake fields.
- v1226-v1227: operator value handle binding fields.
- v1228-v1230: policy and review-state intake fields.
- v1231-v1235: execution lock and no-side-effect intake fields.
- v1236: archive closeout intake field and final guard summary.

## Verification plan

Run typecheck, focused text package intake tests, adjacent instruction/route/barrel/catalog tests, controlled preview full-chain tests, build, HTTP smoke, archive integrity check, and split full test batches before closeout.