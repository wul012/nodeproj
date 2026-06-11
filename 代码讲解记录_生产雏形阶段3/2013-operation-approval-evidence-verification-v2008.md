# v2008 code walkthrough

`operationApprovalEvidenceVerification.ts` recomputes the report and evaluates all verification checks.

This keeps report generation and report verification separate while preserving the old `createOperationApprovalEvidenceVerification` API.
