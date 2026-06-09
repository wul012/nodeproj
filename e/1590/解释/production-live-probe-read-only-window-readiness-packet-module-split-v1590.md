# Node v1590 - production live probe read-only window readiness packet module split

## Focus

blocker message extraction.

## What changed

Production blocker collection moved to the builder so safety failures remain close to the checks that create them.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1582-v1606 batch gates: typecheck, focused readiness packet tests, build, segmented full tests, HTTP smoke, archive, tags, push, and CI.
