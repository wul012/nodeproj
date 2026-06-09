# Node v1632 - production live probe read-only window capture archive module split

## Focus

Extract the capture archive profile and upstream-reference type contracts.

## What changed

The capture archive layer now keeps its public loader stable while moving contracts, archive-rule construction, upstream reference constants, endpoint constants, summary assembly, and Markdown rendering into smaller modules where applicable for this version focus.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1632-v1656 batch gates: typecheck, focused capture archive tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
