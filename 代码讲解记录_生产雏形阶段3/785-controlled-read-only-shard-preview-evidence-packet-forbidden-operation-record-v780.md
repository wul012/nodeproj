# Node v780 code walkthrough: evidence packet forbidden operation record

v780 adds forbidden operation evidence shape.

`EVIDENCE_FORBIDDEN_OPERATION_RECORD` requires write routing and mutation flags; packet gates keep writes and automatic service start disabled.

Verification: covered by the evidence packet focused test.
