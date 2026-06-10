# Node v1815 - approval decision prerequisite gate split

## Focus

Push master and the new tags.

## What changed

The approval-decision prerequisite gate surface is being split into a barrel, types, data, support, core, and Markdown renderer modules while keeping the public import path stable.

## Safety and parallelism

This is a Node-owned maintainability batch. It does not require fresh Java or mini-kv evidence, and both can continue in parallel.

## Verification expectation

This batch is covered by the v1792-v1821 gates: focused split tests, related gate and envelope tests, typecheck, build, segmented Vitest, archive, tags, push, and CI.
