# Node v1835 - controlled read-only shard preview type barrel split

## Focus

Verify the split avoids growing another giant type aggregator.

## What changed

The controlled read-only shard preview type surface is being split so the stable public entrypoint remains compatible while profile typing, aggregate re-exports, reads, preview graph, and evidence endpoint boundaries live in smaller modules.

## Safety and parallelism

This is a Node-owned maintainability batch. It does not require fresh Java or mini-kv evidence, and both sibling projects can continue in parallel.

## Verification expectation

This batch is covered by the v1822-v1846 gates: type-level barrel regression coverage, related controlled read-only shard preview tests, typecheck, build, segmented Vitest, archive, tags, push, and CI.
