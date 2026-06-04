# Node v741 code walkthrough: rehearsal cleanup slot dry run

v741 adds the cleanup slot dry run.

Key code:

- `REHEARSAL_CLEANUP_SLOT_DRY_RUN` maps to `CLEANUP_RECORD_SCHEMA`.
- `cleanupRequiredStepCount` is calculated from steps with `cleanupRequired=true`.

The packet requires cleanup accounting without starting anything during this version.

Verification: covered by the rehearsal packet focused test.
