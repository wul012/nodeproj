# v2006 code walkthrough

`operationApprovalEvidenceService.ts` owns live probe orchestration.

It still returns skipped or not-applicable evidence unless the request target matches and upstream probes are enabled.
