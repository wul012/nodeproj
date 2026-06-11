# Node v1942 - deployment evidence intake gate endpoint catalog

## Focus

Keep endpoint ownership beside the frozen evidence catalog.

## What changed

The intake gate endpoint map moved into `deploymentEvidenceIntakeGateEvidence.ts`.

## Why this matters

Routes, sibling evidence pointers, and archive pointers now have one constants home instead of being buried in the loader.
