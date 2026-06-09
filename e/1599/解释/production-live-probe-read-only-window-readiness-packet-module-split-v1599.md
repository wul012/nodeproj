# Node v1599 - production live probe read-only window readiness packet module split

## Focus

route Markdown compatibility.

## What changed

The stable readiness packet entrypoint re-exports the renderer so route imports and callers keep the same surface.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1582-v1606 batch gates: typecheck, focused readiness packet tests, build, segmented full tests, HTTP smoke, archive, tags, push, and CI.
