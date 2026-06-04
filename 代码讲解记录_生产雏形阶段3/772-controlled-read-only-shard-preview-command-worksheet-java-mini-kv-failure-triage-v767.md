# Node v767 code walkthrough: command worksheet Java and mini-kv failure triage

v767 adds sibling failure triage.

Key code:

- `WORKSHEET_FAILURE_TRIAGE_JAVA_MINI_KV` maps to readiness verification.
- The step owner is `crossProject` and target is `policy`.

This documents how to stop or retry sibling reads without enabling write actions.

Verification: covered by the command worksheet focused test.
