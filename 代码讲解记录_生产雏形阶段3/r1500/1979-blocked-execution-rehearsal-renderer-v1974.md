# Code walkthrough - Node v1974

## Focus

Extract Markdown rendering.

## Code reading notes

- Renderer owns the Markdown profile layout.
- Attempt, evidence file, and snippet render helpers moved with it.
- The service entrypoint re-exports the renderer.

## Maintenance rule

Keep presentation-only logic in Renderer.
