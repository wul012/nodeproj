# Node v493 code walkthrough: consumer readiness evidence report archive

## Version Progress

v493 is the archive step for the v491-v495 consumer readiness chain. v491 created the typed intake, v492 exposed it through JSON/Markdown, and v493 freezes the route output.

## Why This Version Exists

Archive verifiers should not depend on a moving live route response. Even though the v492 route is deterministic in practice, its `generatedAt` field changes with every request. v493 captures one JSON response, one Markdown response, and one digest summary so v494 can verify a concrete artifact set.

## Archive Flow

The archive was generated through Fastify inject rather than a background server:

- build the app with probes and upstream actions disabled;
- call the JSON route with complete audit headers;
- call the Markdown route with the same headers plus `?format=markdown`;
- write both outputs under `e/493/evidence`;
- compute SHA-256 for both files;
- write `java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v493-archive-summary.json`.

The temporary helper script was named `.tmp-v493-archive.mjs` and removed after the run. No process was kept alive.

## What The Summary Proves

The summary records:

- route status codes;
- ready flag from the source profile;
- check count and passed check count;
- active/source Node versions;
- JSON and Markdown file sizes;
- JSON and Markdown SHA-256 digests;
- runtime boundaries showing sibling services were not started and execution remained false.

## Boundary Decisions

v493 does not recalculate sibling evidence and does not re-copy fixtures. The source of truth is the v492 HTTP output. That keeps archive verification honest: v494 will verify exactly what was archived, not a newly generated replacement.

## What v494 Can Safely Do

v494 can add an archive verifier service that reads the three v493 archive files, checks digests and source profile details, and confirms that no runtime execution boundary changed.
