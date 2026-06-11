# Node v746 code walkthrough: rehearsal archive verification dry run

v746 adds archive verification dry-run coverage.

Key code:

- `REHEARSAL_ARCHIVE_VERIFICATION_DRY_RUN` maps to `ARCHIVE_VERIFICATION_INPUTS`.
- The renderer exposes the step with source section, evidence slot, and failure class.

The packet now records what future archive verification should prove.

Verification: covered by the rehearsal packet focused test.
