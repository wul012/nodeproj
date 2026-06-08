# v1382 code walkthrough

The missing-document rejection request item uses all intake guard kinds as its source. This proves missing-document rejection is package-wide, not tied to one slot.

The blocked-reason map includes `CANDIDATE_DOCUMENT_REQUEST_SOURCE_INTAKE_NOT_READY`, `CANDIDATE_DOCUMENT_REQUEST_ITEMS_BLOCKED`, and `CANDIDATE_DOCUMENT_REQUEST_CHECKS_BLOCKED` for fail-closed behavior.
