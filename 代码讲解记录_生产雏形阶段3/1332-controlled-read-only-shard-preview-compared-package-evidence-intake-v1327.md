# Code walkthrough v1327

The detached signature envelope observation slot allows metadata expectations to be stated without importing a signature payload. The slot has `realSignedApprovalPresent: false`, and guards block signed approval and runtime payloads.

This is the boundary between describing an envelope and consuming a signature.
