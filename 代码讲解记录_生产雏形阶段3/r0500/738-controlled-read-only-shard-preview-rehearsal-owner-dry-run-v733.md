# Node v733 code walkthrough: rehearsal owner dry run

v733 turns owner binding into a rehearsal step.

Key code:

- `REHEARSAL_OWNER_DRY_RUN` maps to `OWNER_BINDING_CHECKLIST`.
- The template marks `cleanupRequired=true`, so the packet can count cleanup-sensitive steps before a live rehearsal exists.

This keeps the later live rehearsal honest about owner, port, PID, and cleanup responsibility without starting any process.

Verification: covered by the rehearsal packet focused test.
