# Node v2091 roadmap: production shard execution managed audit store owner binding request

## Goal

Define the managed audit store owner binding request without connecting production storage.

## Necessity Proof

- Blocker resolved: a synthetic approval fixture is insufficient until store ownership and retention details are requestable.
- Later consumer: a real store owner response can fill this request without changing the route shape.
- Reuse decision: keep the store disconnected and represent the request as profile data.
- Growth stop condition: do not add another store owner request unless the managed audit owner changes binding requirements.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. v2091 is a Node/store-owner request packet and does not block sibling progress.

## Engineering Requirements

- Name store owner identity, retention class, immutable record schema, idempotency key policy, and credential redaction proof.
- Keep `connectsManagedAudit=false`, `credentialValueRead=false`, and `rawEndpointUrlParsed=false`.
- Store machine evidence under `e/2091/evidence`.
- Store explanation under `f/2091/解释`; images stay in `f/2091/图片` only if generated.

## Verification

Run focused tests, typecheck, and build before archiving.
