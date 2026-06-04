# Node v745 code walkthrough: rehearsal archive snapshot dry run

v745 adds archive snapshot dry-run coverage.

Key code:

- `REHEARSAL_ARCHIVE_SNAPSHOT_DRY_RUN` maps to `ARCHIVE_SNAPSHOT_INPUTS`.
- The step reserves a future archive snapshot record without writing live evidence now.

This keeps archive preparation separated from execution.

Verification: covered by the rehearsal packet focused test.
