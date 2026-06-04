# Node v760 code walkthrough: command worksheet forbidden operation confirmation

v760 adds forbidden operation confirmation.

Key code:

- `WORKSHEET_FORBIDDEN_OPERATION_CONFIRMATION` maps to `REHEARSAL_FORBIDDEN_OPERATION_CHECK`.
- Worksheet gates include `noWritesAllowed`, `noAutomaticServiceStart`, and `productionExecutionBlocked`.

This keeps the command worksheet from becoming an execution approval.

Verification: covered by the command worksheet focused test.
