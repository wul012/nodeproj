# Node v1589 - production live probe read-only window readiness packet module split

## Focus

packet state resolver.

## What changed

Packet state is determined only after non-state checks are computed, preserving the ready versus blocked semantics.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1582-v1606 batch gates: typecheck, focused readiness packet tests, build, segmented full tests, HTTP smoke, archive, tags, push, and CI.
