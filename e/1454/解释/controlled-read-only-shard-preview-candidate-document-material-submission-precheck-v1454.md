# v1454 candidate document material submission precheck

v1454 adds the redaction-and-secret-boundary checkpoint. It carries redaction log, secret-absence attestation, and redaction secret boundary requests into the submission precheck.

The checkpoint prevents future material intake from bypassing non-secret proof. It also keeps runtime payload import, candidate evaluation, and sibling writes disabled while the actual material is still absent.
