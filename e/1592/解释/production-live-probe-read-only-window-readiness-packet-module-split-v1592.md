# Node v1592 - production live probe read-only window readiness packet module split

## Focus

digest generation boundary.

## What changed

The readiness packet digest remains sha256-stable JSON over the same profile version, source digests, state, requirements, steps, and checks.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1582-v1606 batch gates: typecheck, focused readiness packet tests, build, segmented full tests, HTTP smoke, archive, tags, push, and CI.
