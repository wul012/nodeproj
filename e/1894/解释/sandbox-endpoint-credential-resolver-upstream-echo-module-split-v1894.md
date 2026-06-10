# Node v1894 - sandbox endpoint credential resolver upstream echo module split

## Focus

Check diff hygiene and line-count sanity after the split.

## What changed

Diff check reported only Git CRLF warnings and no whitespace failures.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v105 and mini-kv v114 evidence, so Java v1579 and mini-kv v1417 can continue in parallel.

## Verification

The batch is covered by the local validation already completed in this turn: typecheck, focused upstream echo verification, forced historical fallback, adjacent disabled-precheck regression, build, and full Vitest with maxWorkers=6.
