# v1380 code walkthrough

The approval-separation request item keeps document presence separate from approval grant and signed approval capture. The acceptance checks all block approval grant and signed approval.

Profile integration exposes `readyForApprovalGrant: false` and `readyForSignedApproval: false` next to request-package readiness.
