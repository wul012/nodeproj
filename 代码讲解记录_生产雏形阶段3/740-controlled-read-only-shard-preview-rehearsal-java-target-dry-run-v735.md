# Node v735 code walkthrough: rehearsal Java target dry run

v735 adds the Java target dry run.

Key code:

- `REHEARSAL_JAVA_TARGET_DRY_RUN` maps to `JAVA_TARGET_CHECKLIST`.
- The step owner is `java`, but Node only stores the checklist mapping.

This version does not start Java and does not require a fresh Java artifact. It preserves the target contract for later manual review.

Verification: covered by the rehearsal packet focused test.
