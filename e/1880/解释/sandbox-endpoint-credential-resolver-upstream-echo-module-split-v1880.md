# Node v1880 - sandbox endpoint credential resolver upstream echo module split

## Focus

Extract route paths, evidence paths, and comparison catalogs into constants.

## What changed

Constants now own the route paths, historical evidence paths, and comparison catalogs.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v105 and mini-kv v114 evidence, so Java v1579 and mini-kv v1417 can continue in parallel.

## Verification

The batch is covered by the local validation already completed in this turn: typecheck, focused upstream echo verification, forced historical fallback, adjacent disabled-precheck regression, build, and full Vitest with maxWorkers=6.
