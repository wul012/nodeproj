# Node v2114 verification report builder batch 1 evidence

## Result

- State: verified-local
- Source HEAD before v2114 work: 7a6e1c09
- Renderer inventory: 245 total, 12 migrated after this batch, 233 remaining
- Ratchet: services 1125/1125, routes 80/80
- Baseline raised: false

## Migrated in this batch

- 2 reference migrations prepared by the planning session were verified.
- 10 additional standard renderer files were migrated to `renderVerificationReportMarkdown`.
- The batch keeps public function names, signatures, and file names unchanged.
- The batch does not edit existing test expectations.

## Deferred from raw simple-list prefix

The raw `grep -L "^function "` list included files that are not safe first-batch migrations:

- 5 candidate-document renderers use loops or flatMap-generated nested sections.
- 5 operator evidence value supply files return or aggregate section arrays rather than complete Markdown reports.

Those files remain unchanged and should be handled by a later helper/section-array migration pattern.

## Verification

- `npm run typecheck`: passed
- Step 0 tests: 4 files / 12 tests passed
- Batch focused tests plus ratchet: 15 files / 28 tests passed
- Code walkthrough quality gate fix: 3 files / 5 tests passed after the v2114 walkthrough reached 3008 Chinese characters and score 100
- START_HERE curated-tour paths: verified present
- `.idea/`: removed from Git index and ignored by `.gitignore`

## Cross-project state

Java and mini-kv can continue in parallel. Node v2114 is an internal renderer consolidation and consumes no fresh sibling evidence.
