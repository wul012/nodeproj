# Node v743 code walkthrough: rehearsal order verification

v743 adds order verification.

Key code:

- `EXPECTED_REHEARSAL_VERSIONS` lists Node v732 through Node v751.
- The `versionsSequential` gate compares every step to that expected list.

This prevents archive, tags, and packet order from drifting apart.

Verification: covered by the rehearsal packet focused test.
