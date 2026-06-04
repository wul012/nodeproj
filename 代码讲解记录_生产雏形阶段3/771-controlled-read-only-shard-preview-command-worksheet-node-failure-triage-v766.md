# Node v766 code walkthrough: command worksheet Node failure triage

v766 adds Node failure triage.

Key code:

- `WORKSHEET_FAILURE_TRIAGE_NODE` maps to readiness verification.
- The failure class is unique and included in the worksheet digest.

This gives future manual runs a stop-or-retry branch without allowing mutation.

Verification: covered by the command worksheet focused test.
