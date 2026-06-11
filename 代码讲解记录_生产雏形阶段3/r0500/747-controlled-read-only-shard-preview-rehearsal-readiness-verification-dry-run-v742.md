# Node v742 code walkthrough: rehearsal readiness verification dry run

v742 adds readiness verification.

Key code:

- `REHEARSAL_READINESS_VERIFICATION_DRY_RUN` maps to `WINDOW_READINESS_CHECKLIST`.
- Packet gates include source readiness, step count, version order, safety, and production blocking.

The packet can become ready for manual rehearsal while still refusing live execution.

Verification: covered by the rehearsal packet focused test.
