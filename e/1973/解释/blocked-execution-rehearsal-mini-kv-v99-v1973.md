# Node v1973 - blocked execution rehearsal mini-kv v99 reference

## Focus

Move mini-kv v99 WAL regression projection and JSON helpers into References.

## What changed

`createMiniKvV99Reference` now reads runtime smoke and verification manifest evidence internally, with private typed field helpers.

## Maintenance note

mini-kv v99 remains read-only evidence; Node does not start or mutate mini-kv.
