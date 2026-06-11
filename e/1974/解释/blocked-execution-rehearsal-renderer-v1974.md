# Node v1974 - blocked execution rehearsal renderer

## Focus

Move Markdown rendering out of the loader.

## What changed

`managedAuditManualSandboxConnectionBlockedExecutionRehearsalRenderer.ts` now owns Markdown layout and render helpers for attempts, evidence files, and snippets.

## Maintenance note

Rendering changes should not add policy or evidence logic to the loader.
