# v814 Controlled read-only shard preview evidence intake review package version order

v814 adds `INTAKE_REVIEW_VERSION_ORDER`.

The control verifies that the package controls remain sequential from Node v812 through Node v836. Version order is kept explicit so archive readers can audit the chain without inspecting runtime code.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
