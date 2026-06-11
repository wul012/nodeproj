# Code walkthrough - Node v1965

## Focus

Verify focused behavior after the split.

## Code reading notes

- The upstream echo verification test covers ready, blocked runtime config, forced historical fallback, JSON route, and Markdown route.
- The execution-denied route preflight test covers the downstream consumer.

## Maintenance rule

Run both tests after touching this shared verification source.
