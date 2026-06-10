# Node v1663 - production live probe read-only window capture archive verification module split

## Focus

Move capture archive verification evidence endpoint constants into the builder module.

## What changed

The capture archive verification layer now keeps its public loader stable while moving contracts, verification construction, digest recomputation, endpoint constants, summary assembly, and Markdown rendering into smaller modules where applicable for this version focus.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1657-v1686 batch gates: typecheck, focused capture archive verification tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
