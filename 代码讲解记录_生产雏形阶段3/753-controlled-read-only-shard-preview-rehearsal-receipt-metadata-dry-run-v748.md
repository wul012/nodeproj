# Node v748 code walkthrough: rehearsal receipt metadata dry run

v748 adds receipt metadata dry-run coverage.

Key code:

- `REHEARSAL_RECEIPT_METADATA_DRY_RUN` maps to `SUMMARY_RECEIPT_METADATA`.
- The step keeps receipt metadata separate from source package and live evidence.

This prepares a clean future handoff boundary.

Verification: covered by the rehearsal packet focused test.
