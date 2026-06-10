# Node v1896 - sandbox endpoint credential resolver upstream echo module split

## Focus

Write the batch roadmap with cross-project parallel guidance.

## What changed

The roadmap now documents scope, necessity, parallelism, and verification.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v105 and mini-kv v114 evidence, so Java v1579 and mini-kv v1417 can continue in parallel.

## Verification

The batch is covered by the local validation already completed in this turn: typecheck, focused upstream echo verification, forced historical fallback, adjacent disabled-precheck regression, build, and full Vitest with maxWorkers=6.
