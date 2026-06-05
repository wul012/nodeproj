# Node v778 code walkthrough: evidence packet header redaction record

v778 adds header redaction evidence shape.

`EVIDENCE_HEADER_REDACTION_RECORD` targets `policy`, and every record has `containsSecretValue=false`.

Verification: covered by the evidence packet focused test.
