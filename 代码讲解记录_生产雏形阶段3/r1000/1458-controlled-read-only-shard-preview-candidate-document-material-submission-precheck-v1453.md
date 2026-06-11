# v1453 code walkthrough

v1453 adds signature-attestation coverage. The type layer models signature attestation and approval separation as precheck requirements, not as approvals.

Focused tests assert that reviewed real material submission remains false. This prevents future route changes from accidentally treating signature evidence as signed approval.
