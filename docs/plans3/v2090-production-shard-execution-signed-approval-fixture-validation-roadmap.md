# Node v2090 roadmap: production shard execution signed approval fixture validation

## Goal

Validate a synthetic signed approval fixture shape without granting production authority.

## Necessity Proof

- Blocker resolved: future real approval intake needs parser/schema confidence before a real signature exists.
- Later consumer: real approval artifact intake can reuse the field and non-authoritative guard checks.
- Reuse decision: keep this as a stage payload in the production shard execution chain instead of adding a separate parser service.
- Growth stop condition: do not add another synthetic approval fixture unless the real approval schema changes.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. v2090 is Node-only schema validation and does not require sibling runtime evidence.

## Engineering Requirements

- Mark the fixture as `synthetic=true`, `authoritative=false`, and `executionAuthority=false`.
- Validate approval id, window id, operator identity, source digest binding, expiry, and signature digest shape.
- Store machine evidence under `e/2090/evidence`.
- Store explanation under `f/2090/解释`; create `f/2090/图片` only for actual image evidence.

## Verification

Run focused production shard execution tests and typecheck.
