# Node v740 code walkthrough: rehearsal evidence slot dry run

v740 adds the evidence slot dry run.

Key code:

- `REHEARSAL_EVIDENCE_SLOT_DRY_RUN` maps to `EVIDENCE_RECORD_SCHEMA`.
- `evidenceSlotCount` is derived from unique step evidence slots.

This makes evidence placement explicit before any real read-only evidence is gathered.

Verification: covered by the rehearsal packet focused test.
