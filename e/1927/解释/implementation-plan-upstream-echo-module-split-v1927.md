# Node v1927 - implementation plan upstream echo module split

## Focus

Write the cross-project roadmap for v1904-v1933.

## What changed

The roadmap documents scope, necessity, parallelism, verification, and closeout.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v121 and mini-kv v126 evidence, so Java v1604 and mini-kv v1442 can continue in parallel.

## Verification expectation

The batch is covered by typecheck, focused implementation-plan upstream echo verification, forced historical fallback, adjacent implementation-plan/fake-harness regression, build, full Vitest with maxWorkers=6, and GitHub CI after push.
