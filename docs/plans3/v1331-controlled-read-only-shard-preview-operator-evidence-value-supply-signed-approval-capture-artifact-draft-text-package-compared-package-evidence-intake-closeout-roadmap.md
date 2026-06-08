# v1331 controlled read-only shard preview compared package evidence intake closeout roadmap

## Scope

Node v1322-v1331 adds a read-only compared package evidence intake contract after Node v1321 comparison acceptance precheck. The batch declares ten real-evidence slots and ten guards for a future manually compared draft text package artifact. It does not create, parse, accept, sign, approve, import, or execute any package material.

## Necessity proof

- Blocker resolved: v1321 established that acceptance precheck is ready, but there was no typed intake surface that says what a real manually compared package evidence artifact must provide.
- Later consumer: a future Node version can consume these ten slots before evaluating a real compared package artifact, approval-grant review evidence, or signed approval material.
- Existing report reuse decision: v1321 intentionally summarizes missing acceptance evidence; this batch separates the future real-evidence field contract so the acceptance precheck does not become a payload intake schema.
- Stop condition: this chain stops at evidence slot and guard declaration. It must not fabricate compared package evidence, accept synthetic evidence, capture an approval grant, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes existing controlled preview evidence and frozen/historical sibling fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval. If those projects continue, they can treat this as downstream contract documentation for future read-only evidence consumption.

## Version map

- v1322: source acceptance precheck evidence contract slot and guard.
- v1323: manual submission reference evidence slot and guard.
- v1324: offline comparison result evidence slot and guard.
- v1325: identity binding evidence slot and guard.
- v1326: digest match summary evidence slot and guard.
- v1327: detached signature envelope observation evidence slot and guard.
- v1328: source evidence and operator value handle evidence slot and guard.
- v1329: policy and execution lock evidence slot and guard.
- v1330: approval grant separation evidence slot and guard.
- v1331: archive closeout evidence slot, final guard, renderer, route, and catalog closeout.

## Verification plan

Run typecheck, focused compared package evidence intake tests, v1321 acceptance precheck tests, route/barrel/catalog tests, build, HTTP smoke, archive integrity checks, path-length checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.
