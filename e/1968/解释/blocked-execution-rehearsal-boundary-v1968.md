# Node v1968 - blocked execution rehearsal boundary

## Focus

Preserve the public blocked execution rehearsal entrypoint while splitting internals.

## What changed

The service file still exports the loader, renderer, and profile type, but delegates implementation details to dedicated modules.

## Parallelism

Java and mini-kv can continue in parallel because Node consumes frozen Java v90 and mini-kv v99 evidence only.
