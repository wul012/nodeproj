# Node v762 code walkthrough: command worksheet Java evidence capture

v762 adds the Java evidence capture slot.

Key code:

- `WORKSHEET_EVIDENCE_CAPTURE_JAVA` maps to the rehearsal evidence slot step.
- The target remains `archive`, not a live Java client call.

Node does not require new Java files or a Java process for this version.

Verification: covered by the command worksheet focused test.
