# Changelog

All notable Node project changes are tracked by git tags.

## Version Policy

- `package.json` remains `0.1.0` for now.
- Git tags such as `v2117` are the canonical project milestone identifiers.
- Every completed Node version must add a short changelog entry before commit.
- If a future packaging/release workflow starts publishing npm artifacts, this
  file must be updated with the new package-version policy before changing
  `package.json`.

## v2122 - 2026-06-12

- Migrated 7 Java / mini-kv operator lifecycle and runtime gate archive
  verification renderers to the shared verification report builder.

## v2121 - 2026-06-12

- Migrated 7 disabled runtime shell design draft archive verification renderers
  to the shared verification report builder while retaining their local archive
  reference helper.

## v2120 - 2026-06-12

- Migrated 10 no-helper archive verification renderers across Java / mini-kv
  cleanup and managed-audit credential resolver reports to the shared
  verification report builder.

## v2119 - 2026-06-12

- Migrated 10 Java / mini-kv route catalog cleanup archive verification
  renderers to the shared verification report builder with byte-identical
  output proof.

## v2118 - 2026-06-12

- Added `/api/v1/metrics` with per-upstream request, error, timeout, and
  latency percentile snapshots backed by a bounded in-memory ring buffer.
- Instrumented `OrderPlatformClient` and `MiniKvClient` at their lowest I/O
  methods, added request-id correlation on error responses, and covered the
  endpoint in CI safe smoke.

## v2117 - 2026-06-12

- Added production boundary documentation, changelog/version policy, and frozen
  fixture manifest for production-excellence N3.
- Added a docs regression test so CI checks the N3 maintenance documents.

## v2116 - 2026-06-12

- Added Vitest V8 coverage gate, `npm run test:coverage`, committed thresholds,
  and CI coverage execution.
- Updated CI evidence services so the current coverage test command is accepted
  consistently across workflow, command-profile, hardening-packet, and rehearsal
  guard evidence.

## v2115 - 2026-06-12

- Added ESLint flat config, zero-error warning baseline, unified Vitest timeout
  policy, and CI lint execution for production-excellence N0.

## v2114 - 2026-06-12

- Added the verification report builder foundation and first renderer migration
  batch.

## v2113 - 2026-06-12

- Added explanation readability closeout evidence.

## v2108 - 2026-06-12

- Archived readability maintenance evidence for v2104-v2108.

## v2103 - 2026-06-12

- Expanded per-version Chinese walkthroughs for the 3000-character documentation
  rule.

## v2057 - 2026-06-12

- Split disabled candidate upstream echo verification.

## v2056 - 2026-06-12

- Split disabled candidate upstream echo verification.

## v2055 - 2026-06-12

- Split disabled candidate upstream echo verification.
