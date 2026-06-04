# Node v758 code walkthrough: command worksheet header redaction template

v758 adds header redaction.

Key code:

- `WORKSHEET_HEADER_REDACTION_TEMPLATE` targets `policy`.
- `containsSecretValue` is always false on worksheet steps and on the aggregate worksheet.

This prevents command review artifacts from becoming credential archives.

Verification: covered by the command worksheet focused test.
