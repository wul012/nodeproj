# v1351 controlled read-only shard preview compared evidence evaluation preflight closeout roadmap

## Scope

Node v1332-v1351 adds a read-only compared evidence evaluation preflight after Node v1331 compared package evidence intake. The batch declares twenty evaluation rules and twenty guards for a future real compared package evidence candidate. The preflight can be contract-ready while still waiting for a real candidate; evaluation remains disabled until such evidence exists.

## Necessity proof

- Blocker resolved: v1331 declared real evidence intake fields, but there was no typed evaluation preflight describing how a future candidate would be checked.
- Later consumer: a future Node version can consume these rules before accepting real compared package evidence, approval-grant review evidence, or signed approval material.
- Existing report reuse decision: v1331 should stay an intake schema; this batch separates candidate evaluation so missing evidence, malformed evidence, synthetic evidence, runtime payloads, and write hazards have their own rule surface.
- Stop condition: this chain stops at rules and guards. It must not fabricate a candidate, accept synthetic evidence, capture approval, import runtime payloads, start sibling services, or mutate Java/mini-kv state.

## Cross-project parallel planning

Java and mini-kv are recommended parallel. Node consumes the existing controlled preview chain and frozen/historical sibling fixtures; this batch does not request fresh Java or mini-kv evidence and does not make either project wait for Node approval. If those projects continue, they can treat this as downstream read-only evaluation contract documentation.

## Version map

- v1332: source intake readiness evaluation rule and guard.
- v1333: evidence artifact shape evaluation rule and guard.
- v1334: operator provenance evaluation rule and guard.
- v1335: manual submission reference evaluation rule and guard.
- v1336: offline comparison result evaluation rule and guard.
- v1337: identity binding evaluation rule and guard.
- v1338: digest lineage evaluation rule and guard.
- v1339: signature envelope metadata evaluation rule and guard.
- v1340: source evidence handle evaluation rule and guard.
- v1341: operator value handle evaluation rule and guard.
- v1342: policy assertion evaluation rule and guard.
- v1343: execution lock evaluation rule and guard.
- v1344: approval grant separation evaluation rule and guard.
- v1345: archive reference evaluation rule and guard.
- v1346: secret value exclusion evaluation rule and guard.
- v1347: synthetic evidence exclusion evaluation rule and guard.
- v1348: runtime payload exclusion evaluation rule and guard.
- v1349: write and sibling mutation exclusion evaluation rule and guard.
- v1350: reviewer traceability evaluation rule and guard.
- v1351: evaluation closeout rule, renderer, route, type-module catalog, and archive closeout.

## Verification plan

Run typecheck, focused compared evidence evaluation preflight tests, v1331 intake tests, route/barrel/catalog tests, build, HTTP smoke, archive integrity checks, path-length checks, and split full test batches before closeout. CI can validate the final pushed pair of commits instead of validating every individual version.
