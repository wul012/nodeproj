# Node v1881 - sandbox endpoint credential resolver upstream echo module split

## Focus

Move the Node v260 source reference builder into a dedicated references module.

## What changed

The Node v260 reference builder now lives in the references module instead of the loader.

## Safety and parallelism

This batch only reshapes Node internals around frozen Java v105 and mini-kv v114 evidence, so Java v1579 and mini-kv v1417 can continue in parallel.

## Verification

The batch is covered by the local validation already completed in this turn: typecheck, focused upstream echo verification, forced historical fallback, adjacent disabled-precheck regression, build, and full Vitest with maxWorkers=6.
