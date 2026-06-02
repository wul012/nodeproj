# Node v541 code walkthrough: latest sibling evidence report archive

## Why This Version Exists

v540 exposed the Java v274 and mini-kv v247 latest sibling evidence report. v541 preserves that public output as archive evidence.

## Archive Generation

A temporary Fastify inject helper requested:

- `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence`
- `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence?format=markdown`

It wrote the JSON response, Markdown response, and a digest summary under `e/541/evidence/`.

## Archive Summary

The summary records:

- JSON and Markdown status codes;
- ready state and 13/13 source checks;
- active/source Node versions;
- Java v274 and mini-kv v247 evidence versions;
- route catalog 224/60/26;
- SHA-256 digests for both archived route outputs;
- closed runtime boundaries.

## Boundary

The temporary helper was removed after generation. No Java or mini-kv service was started, and no live smoke was attempted.
