# Node v1627 - production live probe read-only window live capture module split

## Focus

focused live capture behavioral guard.

## What changed

Existing live capture tests continue to verify skipped, pass, blocked, and route behavior after the split.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1607-v1631 batch gates: typecheck, focused live capture tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
