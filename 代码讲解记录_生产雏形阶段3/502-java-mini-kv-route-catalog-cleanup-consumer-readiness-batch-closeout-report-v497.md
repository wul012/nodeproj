# Node v497 code walkthrough: consumer readiness batch closeout report

## Version Progress

v497 turns the v496 local closeout into a route. It is the report step in the v496-v500 chain.

## Why This Version Exists

The closeout profile needs to be archived just like the earlier evidence reports. The archive process works from JSON/Markdown route output, so v497 adds a stable report endpoint.

## Code Flow

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport.ts` is intentionally thin. It exports the route path and delegates to `loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout()`.

The renderer prints:

- closeout metadata;
- cross-project mode;
- closed versions;
- route catalog counts;
- source archive details;
- summary counts;
- all closeout checks;
- file references and digests;
- next actions.

## Route Accounting

v497 adds one route to the existing cleanup route group:

- total JSON/Markdown routes: 207 to 208;
- Java/mini-kv domain routes: 43 to 44;
- cleanup handoff route group: 9 to 10.

The closeout profile itself still records v491-v495 as closed at route count 207. That distinction is intentional: v497 is the report route about the closed chain, not part of the closed chain.

## Validation

The focused route test checks JSON and Markdown. JSON must show v496/v495, ready=true, 22/22 files, 15/15 checks, and closed route count 207. Markdown must show the closeout title, `routeCount: 207`, and the Java dirty-worktree exclusion check.

## What v498 Can Safely Do

v498 can archive the v497 route output into `e/498/evidence`, record SHA-256 digests, and keep Java/mini-kv parallel.
