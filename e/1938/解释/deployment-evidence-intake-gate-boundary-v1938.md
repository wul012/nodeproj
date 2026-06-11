# Node v1938 - deployment evidence intake gate split boundary

## Focus

Set the split boundary for the deployment evidence intake gate without changing the public service contract.

## What changed

The public entrypoint remains `deploymentEvidenceIntakeGate.ts`, and downstream callers keep importing the same loader, renderer, and profile type.

## Why this matters

The file had become a mixed ownership surface. This version fixes the refactor direction first so later edits can move code by responsibility instead of changing behavior.

## Parallelism

Java and mini-kv can continue in parallel because Node only consumes frozen Java v60 and mini-kv v69 evidence.
