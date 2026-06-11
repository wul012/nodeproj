# Code walkthrough - Node v1940

## Focus

Extract Java v60 deployment runbook evidence.

## Code reading notes

- `deploymentEvidenceIntakeGateEvidence.ts` owns `JAVA_V60_DEPLOYMENT_RUNBOOK`.
- The evidence remains read-only and execution-disabled.
- Checks and loader consume the same exported constant.

## Maintenance rule

Refresh Java evidence only in the evidence module unless behavior changes are explicitly required.
