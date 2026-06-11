# Node v737 code walkthrough: rehearsal header policy check

v737 adds the header policy check.

Key code:

- `REHEARSAL_HEADER_POLICY_CHECK` maps to `OPERATOR_HEADER_POLICY`.
- The instruction checks guarded Node header names without storing secret values.

This keeps the future live rehearsal tied to policy names instead of accidentally archiving credentials.

Verification: covered by the rehearsal packet focused test.
