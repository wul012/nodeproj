# Node v1907 - implementation plan upstream echo module split

## Focus

Move the Java v121 implementation-plan echo reference builder into References.

## What changed

Java v121 evidence file and snippet construction is isolated from profile assembly.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v121 and mini-kv v126 evidence, so Java v1604 and mini-kv v1442 can continue in parallel.

## Verification expectation

The batch is covered by typecheck, focused implementation-plan upstream echo verification, forced historical fallback, adjacent implementation-plan/fake-harness regression, build, full Vitest with maxWorkers=6, and GitHub CI after push.
