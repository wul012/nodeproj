# v1995 code-health scan

This version updates `managedAuditSandboxCodeHealthPass` to scan the whole v247 service module family after the split.

The safety scan is not weakened. It still blocks if any split module introduces real clients, `fetch`, credential-boundary drift, schema-migration drift, or auto-start drift.
