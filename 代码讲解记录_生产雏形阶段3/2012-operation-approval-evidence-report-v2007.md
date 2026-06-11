# v2007 code walkthrough

`operationApprovalEvidenceReport.ts` builds the immutable report shape.

It summarizes request, decision, Java evidence, mini-kv evidence, and then computes the evidence digest from stable JSON.
