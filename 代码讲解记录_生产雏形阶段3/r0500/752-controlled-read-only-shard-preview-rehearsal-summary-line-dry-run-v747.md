# Node v747 code walkthrough: rehearsal summary line dry run

v747 adds compact summary line dry-run coverage.

Key code:

- `REHEARSAL_SUMMARY_LINE_DRY_RUN` maps to `ARCHIVE_SUMMARY_LINES`.
- The future summary is represented as a bounded evidence slot rather than open-ended prose.

This keeps later summaries reviewable and tied to packet evidence.

Verification: covered by the rehearsal packet focused test.
