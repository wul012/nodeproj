# v1995 code walkthrough

`managedAuditSandboxCodeHealthPass` now reads the v247 module family instead of only the public entrypoint.

The scan catches real clients, `fetch`, and safety-boundary text across the split files, which matches the new source layout.
