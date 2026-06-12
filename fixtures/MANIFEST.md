# Historical Fixture Manifest

This manifest describes the frozen sibling-workspace evidence committed under
`fixtures/historical/sibling-workspaces/`.

## Rules

- Treat every listed file as load-bearing historical evidence.
- Do not rename, move, overwrite, or reformat these files as part of unrelated
  cleanup.
- If a later Node version needs different upstream evidence, add a versioned
  snapshot rather than replacing an existing file.
- When a Node service consumes a new Java or mini-kv artifact, add the frozen
  file in the same version and update this manifest.
- Prefer structured JSON parsing for JSON receipts; use snippet checks only for
  documents/source files that have no stable JSON schema.

## Summary

| Workspace | Root | Files | JSON files | Version span | Notes |
| --- | --- | ---: | ---: | --- | --- |
| Java | `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/` | 222 | 50 | v82-v274 | Includes Java explanation snapshots, Java ops source snapshots, and 44 shard-readiness evidence JSON files under `e/<version>/evidence/`. |
| mini-kv | `fixtures/historical/sibling-workspaces/mini-kv/` | 174 | 77 | v91-v610 | Includes release receipt JSON under `fixtures/release/`, source/test snapshots, and explanation snapshots. |

## Java Coverage

The Java snapshot covers:

- Dependabot and Maven CI evidence under
  `fixtures/historical/sibling-workspaces/javaproj/.github/`.
- Historical explanation snapshots under
  `advanced-order-platform/c/<version>/解释/`,
  `advanced-order-platform/d/<version>/解释/`, and
  `advanced-order-platform/e/<version>/解释/`.
- Shard readiness evidence JSON from v153-v167 and v206-v239, plus v274,
  under `advanced-order-platform/e/<version>/evidence/`.
- Java ops source snapshots under
  `advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/`.
- Code walkthrough snapshots under
  `advanced-order-platform/代码讲解记录_生产雏形阶段_续/`.

Java files are consumed by Node services as frozen evidence only. They are not a
live Java workspace and must not be edited from the Node repo.

## mini-kv Coverage

The mini-kv snapshot covers:

- Dependabot evidence under
  `fixtures/historical/sibling-workspaces/mini-kv/.github/dependabot.yml`.
- Historical explanation snapshots under `c/`, `d/`, and `e/`.
- Release receipt JSON under `fixtures/release/`, including credential resolver
  non-participation receipts, shard readiness snapshots, runtime smoke evidence,
  current-runtime rolling guard evidence, and verification manifest evidence.
- Source/test snapshots under `src/` and `tests/`.
- Code walkthrough snapshots under the mini-kv Chinese walkthrough folders.

mini-kv files are consumed by Node services as frozen evidence only. They are
not a live mini-kv workspace and must not be edited from the Node repo.

## Current Node Consumer Expectations

Node consumers rely on these fixture properties:

- Paths remain stable for `historicalEvidenceResolver.ts` snapshot mappings.
- JSON receipt fields remain byte-compatible with the tests that parse them.
- Markdown/source snippets remain available for older verification services.
- No fixture grants Node permission to start Java, start mini-kv, write upstream
  state, or authorize production execution.

## Update Checklist

When adding a new frozen sibling artifact:

1. Add the artifact under the appropriate sibling snapshot tree.
2. Update this manifest with the new version span and artifact family.
3. Add or update the Node test that forces historical fallback when the artifact
   is consumed.
4. Run the previous-version focused test together with the new-version focused
   test to catch accidental fixture pollution.
