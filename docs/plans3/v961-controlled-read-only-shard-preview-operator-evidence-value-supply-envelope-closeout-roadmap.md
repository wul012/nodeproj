# Node v961 controlled read-only shard preview operator evidence value supply envelope closeout roadmap

## Goal

Node v937-v961 adds the controlled read-only shard preview operator evidence value supply envelope.

The package consumes the completed Node v936 fresh sibling intake plus committed Java v633 and mini-kv v585 value draft evidence. It prepares a reviewable envelope for future operator value supply, but it does not supply, accept, import, normalize, persist, route, or execute any values.

## Cross-Project State

Read-only progress check performed before this Node batch:

- Node: `D:\nodeproj\orderops-node`, latest committed version before this batch was `b3bc04d5 Add shard preview fresh sibling evidence intake` at tags `v912` through `v936`; branch was clean and synced with `nodeproj/master`.
- Java: `D:\javaproj\advanced-order-platform`, latest commit `c0ccc245 feat: expose operator evidence value draft closeout` at tag `v633-order-platform-operator-evidence-value-draft-closeout-route`; branch was clean and synced with `javaproject/master`.
- mini-kv: `D:\C\mini-kv`, latest commit `b53f669 mini-kv v585 route-preview-value-draft-release-package` at tag `v585`; branch was clean and synced with `mini_kv/master`.

Java and mini-kv are recommended parallel. Node v937-v961 does not require Java or mini-kv to wait for Node approval, does not start sibling services, and does not modify sibling files. Node only consumes frozen historical copies of the Java v633 and mini-kv v585 evidence required for CI compatibility.

## Necessity Proof

- Blocker resolved: v936 proved fresh sibling evidence intake for import preflight, but it still did not bind the latest Java and mini-kv value draft closeouts into a reviewable value supply envelope.
- Later consumer: the future explicit operator value supply layer can use this envelope to know which Java and mini-kv value draft fields, counts, and lock states are already verified before any real value is accepted.
- Existing report cannot be reused: v911 owns blank value draft slots and v936 owns fresh sibling intake; neither proves Java v633 closeout, mini-kv v585 release package, supplied/accepted/imported value counts, adapter-disabled state, or forced historical fallback for the value supply envelope.
- Growth stop condition: this package stops at envelope review readiness. It does not accept operator values, import evidence, enable manual entry, accept runtime payloads, normalize synthetic evidence, store secrets, start services, mutate sibling state, or allow live/production execution.

## Version Thickness Rule

This batch treats v937-v961 as twenty-five owned slices:

- v937-v948 consume Java v633 value draft closeout service, response, and assurance-test evidence.
- v949-v960 consume mini-kv v585 `SHARDROUTEVALUEDRAFTJSON` source and focused-test evidence.
- v961 closes the Node value supply envelope and ties it back to Node v936 fresh sibling intake.

Each slice has a distinct `VALUE_SUPPLY_ENVELOPE_*` code, one source fresh sibling intake slot mapping, one evidence file id, one evidence snippet id, explicit envelope field names, zero supplied/accepted/imported values, a disabled value supply adapter, a read-only boundary, and fail-closed readiness.

## Scope

- Add value supply envelope types for versions v937-v961.
- Add a dedicated evidence path/snippet module for Java v633 and mini-kv v585 fingerprints.
- Add a slot builder that maps v937-v961 slots to v936 fresh sibling intake slots and fails closed when the source intake is blocked.
- Add an artifact builder with envelope gates, blocked reason codes, value counts, file/snippet counts, and a stable digest.
- Add a Markdown renderer and a compact controlled-preview profile section.
- Re-export the builder and renderer through the review artifact barrel.
- Register five value supply envelope modules in the type module catalog and update validation to Node v961.
- Add historical fallback fixtures for the Java v633 and mini-kv v585 source files used by the envelope.
- Add focused tests for ready, blocked, renderer, profile, forced historical fallback, routes, catalog, and barrel behavior.
- Extend `test/support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.ts` with a fresh sibling intake fixture so future envelope tests avoid duplicating the live-window chain.
- Add `e/937` through `e/961` explanation files and code walkthroughs 942-966.

## Validation Result

Completed during v961 closeout:

- `npm.cmd run typecheck`: passed.
- focused value supply envelope test: 1 file, 5 tests passed.
- focused adjacent v911/v936/v961 route/catalog/barrel batch: 7 files, 41 tests passed.
- adjacent controlled-preview batch plus minimal route: 24 files, 102 tests passed.
- `npm.cmd run build`: passed.
- `dist` must be removed before commit.

The full vitest suite is intentionally not run as one huge local batch in this package because earlier local runs left a large worker tree. The verification strategy is focused, adjacent, typecheck, build, and remote CI after push.

## Parallel Guidance

Java can continue its own value draft follow-up work after v633. mini-kv can continue its own route preview value draft follow-up work after v585. Node is not a pre-approval blocker for either project.

If Node later needs fresh Java or mini-kv evidence, the plan must name exact upstream versions, expected files, fallback fixture paths, and whether live integration is required. If live integration is required, the plan must also name service owner, port, startup command, cleanup command, and evidence capture route before any service is started.

## Next Direction

After v961, do not start real execution yet. The stronger next layer is an explicit operator value supply design that remains disabled until a separate approval packet exists:

- per-value provenance and redaction policy;
- missing-value and malformed-value rejection;
- operator approval packet identity and timestamp fields;
- no automatic sibling import;
- no runtime payload acceptance;
- no live execution until approval, evidence import, and cleanup gates are all independently proven.

Maintenance should continue alongside functionality: keep evidence catalogs, slot templates, artifact gates, renderers, and profile types split as separate ownership groups.
