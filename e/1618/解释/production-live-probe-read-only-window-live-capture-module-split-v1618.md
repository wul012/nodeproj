# Node v1618 - production live probe read-only window live capture module split

## Focus

live capture digest boundary.

## What changed

The live capture digest remains sha256-stable JSON over the same version, source digests, state, flags, records, and checks.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1607-v1631 batch gates: typecheck, focused live capture tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
