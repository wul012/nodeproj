# v1478 candidate document profile section renderer split

v1478 records the split full-test strategy. Focused tests run first, then the full suite is split into smaller vitest batches instead of one large high-memory run.

This keeps verification strong while respecting the local Node process budget.
