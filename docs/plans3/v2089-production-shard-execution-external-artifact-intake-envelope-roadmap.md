# Node v2089 roadmap: production shard execution external artifact intake envelope

## Goal

Define the dry-run intake envelope for external artifacts while keeping every artifact non-authoritative unless a real external provider supplies it.

## Necessity Proof

- Blocker resolved: v2088 named missing external artifacts, but did not define the intake envelope that will later receive them.
- Later consumer: v2090-v2093 use these exact slots for synthetic validation, store-owner request, receipt reconciliation, and closeout.
- Reuse decision: keep the shared production shard execution profile builder and avoid creating a new artifact report family.
- Growth stop condition: do not expand artifact slots unless a real external provider adds a required artifact kind.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can continue producing owner receipts against the named slots; Node v2089 does not wait for fresh sibling files.

## Engineering Requirements

- Name five artifact slots: signed approval, store owner binding, Java receipt, mini-kv receipt, and cleanup reconciliation receipt.
- Mark the envelope as dry-run only.
- Record the archive layout: `e/<version>/evidence`, `f/<version>/解释`, and `f/<version>/图片` only when image evidence exists.
- Keep `readyForProductionShardExecution=false` and `executionAllowed=false`.

## Verification

Run production shard execution focused tests, route catalog tests, typecheck, build, and final HTTP smoke.
