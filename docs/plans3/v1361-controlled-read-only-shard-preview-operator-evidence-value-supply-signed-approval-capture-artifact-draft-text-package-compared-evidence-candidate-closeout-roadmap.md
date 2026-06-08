# v1361 controlled read-only shard preview compared evidence candidate closeout roadmap

## Scope

Node v1352-v1361 adds the compared evidence candidate blueprint layer after Node v1351 compared evidence evaluation preflight.

The new layer converts the twenty expected real candidate fields from v1351 into ten maintainable candidate sections and ten blockers. It does not import a real candidate, does not synthesize evidence, does not grant approval, does not capture signed approval, does not start services, and does not mutate Java or mini-kv state.

## Necessity proof

- Blocker resolved: v1351 declared twenty candidate fields, but there was no grouped candidate contract for an operator or sibling project to populate later.
- Later consumer: the next real-candidate intake can consume the ten section blueprint instead of scanning twenty evaluation rules directly.
- Existing report cannot be reused: v1351 preflight is rule-oriented and intentionally says all candidate values are absent; this version adds candidate-section ownership, blocker semantics, and field grouping.
- Stop condition: this chain stops at blueprint readiness until a real compared package evidence candidate exists.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1352-v1361 consumes the frozen v1351 Node preflight contract and historical sibling fallback path; it does not need fresh Java or mini-kv evidence to complete.

If Java or mini-kv generate real compared package evidence later, they should provide durable source handles, operator provenance, offline comparison result, identity/digest lineage, policy locks, approval separation, and archive closeout references matching the ten Node blueprint sections.

## Closeout checks

- typecheck
- focused candidate/preflight/routes/barrel/type-catalog tests
- build
- archive integrity for v1352-v1361 explanation and walkthrough files
- path length check for new compared evidence candidate modules
- HTTP smoke after build
- cleanup of .tmp, dist, and smoke server before final
