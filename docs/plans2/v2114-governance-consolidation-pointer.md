# v2114+ Active Plan Pointer (governance consolidation)

The currently active Node plan is the **governance consolidation milestone**:

- Plan: `docs/plans/v2114-governance-consolidation-roadmap.md`
- Execution playbook: `docs/plans/v2114-codex-migration-playbook.md`
- Progress: see the playbook's progress table (batch 1 is tracked in the v2114
  consolidation commit and tag once CI is green).

For Java / mini-kv sessions reading this folder:

- **Java and mini-kv are recommended parallel** for the entire duration of this
  plan. Node consolidation only rewrites Node-internal renderer code with
  byte-identical output, consumes no fresh upstream evidence, and is not a
  pre-approval blocker for any Java or mini-kv version.
- **Do not rename or move archive folders** (`a/`–`f/`, especially `e/<version>/`)
  or evidence JSON files in `D:\javaproj\advanced-order-platform` or
  `D:\C\mini-kv`: orderops-node hardcodes 439 absolute path references to those
  trees (see `src/services/historicalEvidenceResolver.ts` and
  `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.ts`), and Node
  tests assert exact paths and content digests.
- No new echo/verification/readiness chains should be added in Node during this
  plan; if a Java/mini-kv version believes it needs a new Node-side chain,
  record the request and wait for the consolidation plan to close.
