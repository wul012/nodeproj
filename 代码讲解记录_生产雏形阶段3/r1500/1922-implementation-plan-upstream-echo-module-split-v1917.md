# Code walkthrough - Node v1917

## Focus

Move summary assembly into Core.

## Code reading notes

- Summary assembly is part of final profile creation.
- It keeps countReportChecks and countPassedReportChecks in Core.
- The summary count expectations remain covered by the focused test.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
