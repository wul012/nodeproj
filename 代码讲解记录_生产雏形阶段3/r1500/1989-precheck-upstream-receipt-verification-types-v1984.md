# v1984 code walkthrough

The new types module owns the exported profile and internal receipt/check/message contracts.

This makes the rest of the split modules depend on stable structural contracts instead of importing runtime functions from the entrypoint.
