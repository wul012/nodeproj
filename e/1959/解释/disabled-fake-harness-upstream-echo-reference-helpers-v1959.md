# Node v1959 - disabled fake harness upstream echo reference helpers

## Focus

Move evidence digest and typed field helpers into references.

## What changed

The helper functions for digesting evidence files and extracting string, number, boolean, and string-array fields now live in the references module.

## Maintenance note

Parsing helpers stay private to references unless another module genuinely needs them.
