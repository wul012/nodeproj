# v2006 service

This version moves `OperationApprovalEvidenceService` into its own module.

The service still owns upstream probe collection through the existing OrderPlatform and mini-kv clients, and still obeys `UPSTREAM_PROBES_ENABLED` before requesting live evidence.
