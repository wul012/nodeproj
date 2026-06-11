# Node v739 code walkthrough: rehearsal forbidden operation check

v739 adds the forbidden operation check.

Key code:

- `REHEARSAL_FORBIDDEN_OPERATION_CHECK` maps to `FORBIDDEN_OPERATION_CHECKLIST`.
- The step is cross-project because the forbidden set spans Node, Java, and mini-kv behavior.

The packet keeps destructive or mutating operations outside the rehearsal chain.

Verification: covered by the rehearsal packet focused test.
