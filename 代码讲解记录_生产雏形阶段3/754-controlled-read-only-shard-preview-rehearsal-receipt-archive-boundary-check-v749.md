# Node v749 code walkthrough: rehearsal receipt archive boundary check

v749 adds receipt archive boundary checking.

Key code:

- `REHEARSAL_RECEIPT_ARCHIVE_BOUNDARY_CHECK` maps to `RECEIPT_ARCHIVE_BOUNDARY`.
- The step has its own evidence slot and failure class.

This prevents later receipt archive output from blending with source package, verification, or cleanup records.

Verification: covered by the rehearsal packet focused test.
