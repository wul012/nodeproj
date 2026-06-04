# Node v768 code walkthrough: command worksheet archive snapshot record

v768 adds archive snapshot record preparation.

Key code:

- `WORKSHEET_ARCHIVE_SNAPSHOT_RECORD` maps to `REHEARSAL_ARCHIVE_SNAPSHOT_DRY_RUN`.
- The worksheet digest covers order, version, code, target, evidence slot, cleanup slot, and failure class.

Verification: covered by the command worksheet focused test.
