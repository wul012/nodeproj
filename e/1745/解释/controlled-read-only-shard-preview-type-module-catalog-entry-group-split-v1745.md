# Node v1745 - controlled read-only shard preview type module catalog entry group split

## Focus

Confirm no fresh mini-kv evidence is required for this Node-only split.

## What changed

The type module catalog remains available through the same public functions, but the oversized catalog body is now split across types, constants, aggregate entry groups, and focused entry-group modules where applicable for this version focus.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1722-v1756 batch gates: typecheck, focused catalog tests, adjacent route and review artifact tests, build, segmented tests, archive, tags, push, and CI.
