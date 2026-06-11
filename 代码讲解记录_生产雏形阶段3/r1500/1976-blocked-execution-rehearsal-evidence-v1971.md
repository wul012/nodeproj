# Code walkthrough - Node v1971

## Focus

Extract evidence collection.

## Code reading notes

- `createEvidenceFiles` builds historical evidence descriptors.
- `createSnippetMatches` checks expected text in frozen sibling evidence.
- Both functions live in References.

## Maintenance rule

Evidence collection remains read-only and file-backed.
