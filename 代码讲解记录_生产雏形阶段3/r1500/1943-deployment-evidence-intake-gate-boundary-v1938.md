# Code walkthrough - Node v1938

## Focus

Preserve the public deployment evidence intake gate entrypoint while splitting internals.

## Code reading notes

- Downstream imports still target `deploymentEvidenceIntakeGate.ts`.
- The loader and Markdown renderer remain exported from the same file.
- The profile type is re-exported from the entrypoint for compatibility.

## Maintenance rule

Keep public import compatibility stable when reshaping internals.
