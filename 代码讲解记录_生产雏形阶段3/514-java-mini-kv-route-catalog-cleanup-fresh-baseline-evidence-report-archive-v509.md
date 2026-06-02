# Node v509 code walkthrough: fresh baseline report archive

## Why This Version Exists

v508 exposes the fresh baseline report as a live route. v509 freezes that route output so the next verifier can compare stable files instead of depending on a freshly generated response.

## Archived Outputs

The archive keeps three files under `e/509/evidence`:

- JSON route body;
- Markdown route body;
- archive summary with status codes, readiness fields, route counts, file sizes, and SHA-256 digests.

## Boundary

The archive was generated through local `app.inject` requests. No HTTP server was left running, no Java/mini-kv process was started, and no runtime execution authority was opened.

## Next Version

v510 should add an archive verifier service that reads these files, checks the stored hashes, validates ready=true and 9/9 checks, and confirms the read-only boundary remains closed.
