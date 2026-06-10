# Node v1914 - implementation plan upstream echo module split

## Focus

Keep side-effect boundary checks grouped and reviewable.

## What changed

Credential, raw endpoint, resolver, connection, write, and auto-start boundaries remain grouped for review.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v121 and mini-kv v126 evidence, so Java v1604 and mini-kv v1442 can continue in parallel.

## Verification expectation

The batch is covered by typecheck, focused implementation-plan upstream echo verification, forced historical fallback, adjacent implementation-plan/fake-harness regression, build, full Vitest with maxWorkers=6, and GitHub CI after push.
