# Node v1948 - deployment evidence intake gate entrypoint

## Focus

Keep the entrypoint focused on composition and rendering.

## What changed

`deploymentEvidenceIntakeGate.ts` now loads the upstream summary, composes the gate, projects summaries, computes the digest, and renders Markdown.

## Why this matters

The public file is small enough to audit as an entrypoint instead of a mixed service warehouse.
