# Code walkthrough - Node v1969

## Focus

Extract blocked execution rehearsal types.

## Code reading notes

- Types now own the public profile and helper shapes.
- Source, Java, mini-kv, evidence, snippet, attempt, check, and message shapes share one type module.
- The entrypoint re-exports the public profile type.

## Maintenance rule

Add new structural fields in Types first.
