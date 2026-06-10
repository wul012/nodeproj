# Node v1713 - production live probe read-only window capture release evidence review module split

## Focus

Keep JSON and Markdown route coverage after the split.

## What changed

The release evidence review layer now keeps its public loader stable while moving contracts, field-guide references, release semantics, digest creation, endpoint constants, summary assembly, and Markdown rendering into smaller modules where applicable for this version focus.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1687-v1721 batch gates: typecheck, focused release evidence review tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
