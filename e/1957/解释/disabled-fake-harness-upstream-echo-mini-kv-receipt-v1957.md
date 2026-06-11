# Node v1957 - disabled fake harness upstream echo mini-kv receipt

## Focus

Move mini-kv v127 receipt parsing into references.

## What changed

`createMiniKvV127Reference` now reads and projects the disabled fake harness non-participation receipt from the references module.

## Maintenance note

mini-kv remains a frozen evidence input and is not started or mutated by Node.
