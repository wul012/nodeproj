# v1360 code walkthrough

The approval-separation section preserves the rule that comparison evidence is not approval. It requires future candidates to prove approval-grant separation while the current contract keeps `approvalGrantPresent` and `signedApprovalPresent` false.

This stops candidate readiness from being confused with signed approval capture.
