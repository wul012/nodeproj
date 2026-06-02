# Node v552 code walkthrough: latest sibling live smoke route archive verifier route archive

## Why This Version Exists

v551 made the v549 route-archive verifier public. v552 captures that public JSON and Markdown output so a later verifier can validate the route response without depending on a live route call.

## Generation Flow

The archive was generated with a temporary local script under `.tmp`:

1. Build Node into `dist`.
2. Import `buildApp` from `dist/app.js`.
3. Build the Fastify app with test audit headers and access-guard enforcement enabled.
4. Inject the v551 JSON route.
5. Inject the v551 Markdown route.
6. Write both responses under `e/552/evidence/`.
7. Write a compact summary with status codes, readiness, checks, route catalog counts, boundary flags, and SHA-256 digests.

The script is temporary and removed before commit.

## Evidence Shape

The JSON archive contains the full v549 verifier profile.

The Markdown archive contains the same verifier rendered for human review.

The summary records:

- `ready=true`;
- status codes `200/200`;
- `checkCount=18` and `passedCheckCount=18`;
- source archive route counts `226/62/28`;
- current route catalog counts `227/63/29`;
- SHA-256 digests for archived JSON and Markdown;
- closed runtime boundary flags.

## Boundary

v552 does not run a live smoke, start Java, start mini-kv, or expose a new route. It only archives the v551 route output. v553 can verify these archive files.
