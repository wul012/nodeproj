# Node v548 code walkthrough: latest sibling live smoke archive verification route archive

## Why This Version Exists

v547 made the archive verifier public. v548 captures the route output so the route response itself can be verified later instead of relying on a live route call.

## Generation Flow

The archive was generated with a temporary local script under `.tmp`:

1. Build Node into `dist`.
2. Import `buildApp` from `dist/app.js`.
3. Build a Fastify app with test audit headers.
4. Inject the v547 JSON route.
5. Inject the v547 Markdown route.
6. Write both responses under `e/548/evidence/`.
7. Write a compact summary with route status codes, readiness, route catalog counts, boundaries, and SHA-256 digests.

The script was temporary and is removed before commit.

## Evidence Shape

The JSON archive contains the full v546 verifier profile.

The Markdown archive contains the same verifier rendered for human review.

The summary records:

- `ready=true`;
- status codes `200/200`;
- `checkCount=24` and `passedCheckCount=24`;
- v545 source smoke record and cleanup counts;
- route catalog counts `226/62/28`;
- SHA-256 digests for archived JSON and Markdown.

## Boundary

v548 does not run the smoke, start sibling services, or expose a new route. It only archives the v547 route output. v549 should be an archive verifier for these files.
