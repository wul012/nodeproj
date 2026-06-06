# Node v936 controlled read-only shard preview operator evidence fresh sibling intake closeout roadmap

## Goal

Node v912-v936 adds the controlled read-only shard preview operator evidence fresh sibling intake package.

The package consumes the completed Node v911 value draft plus committed Java v608 and mini-kv v560 read-only evidence. It is a pre-execution preparation layer only: it proves Node can read, freeze, and verify sibling project import-preflight evidence before designing any operator value-supply adapter.

## Cross-Project State

Read-only progress check performed before this Node batch:

- Node: `D:\nodeproj\orderops-node`, latest committed version before this batch was `ba400d73 Add shard preview operator evidence value draft` at tags `v887` through `v911`; branch was clean and synced with `nodeproj/master`.
- Java: `D:\javaproj\advanced-order-platform`, latest commit `f8e28be2 feat: expose operator evidence import preflight closeout` at tag `v608-order-platform-operator-evidence-import-preflight-closeout-route`; branch was clean and synced with `javaproject/master`.
- mini-kv: `D:\C\mini-kv`, latest commit `e9e77b6 v560 advance route preview import preflight route-preview-import-preflight-release-package` at tag `v560`; branch was clean and synced with `mini_kv/master`.

Java and mini-kv are recommended parallel. Node v912-v936 does not require Java or mini-kv to wait for Node approval, does not start sibling services, and does not modify sibling files. Node only consumes frozen historical copies of the Java v608 and mini-kv v560 evidence required for CI compatibility.

## Necessity Proof

- Blocker resolved: v911 produced draft slots but still had no fresh sibling evidence intake proving Java v608 and mini-kv v560 completed their corresponding read-only import-preflight surfaces.
- Later consumer: a future explicit value-supply adapter can use this intake to know which sibling evidence is already verified before accepting operator-entered values.
- Existing report cannot be reused: v911 value draft owns field names and blank value state; it cannot prove Java/mini-kv source evidence, forced historical fallback, or source snippet parity.
- Growth stop condition: this package stops at source-evidence readiness. It does not accept values, import evidence, normalize synthetic payloads, start services, mutate sibling state, or enable live/production execution.

## Version Thickness Rule

This batch treats v912-v936 as twenty-five owned slices:

- v912-v923 consume Java v608 closeout service, response, and assurance-test evidence;
- v924-v935 consume mini-kv v560 C++ source, focused test, release explanation, and README evidence;
- v936 closes the cross-project intake and ties it back to Node v911 value draft.

Each slice has a distinct `FRESH_INTAKE_*` code, one source value-draft slot mapping, one evidence file id, one evidence snippet id, a read-only boundary, and fail-closed readiness.

## Scope

- Add fresh sibling intake types for versions v912-v936.
- Add a dedicated evidence path/snippet module so Java and mini-kv fingerprints do not live inside the gate builder.
- Add a slot builder that maps v912-v936 slots to v911 value-draft slots and fails closed when the aggregate value draft is blocked.
- Add an artifact builder with twenty-five gates, blocked reason codes, file/snippet counts, and a stable digest.
- Add a Markdown renderer and a compact controlled-preview profile section.
- Re-export the builder and renderer through the review artifact barrel.
- Register five fresh-intake modules in the type module catalog and update validation to Node v936.
- Add historical fallback fixtures for the Java v608 and mini-kv v560 source files used by the intake.
- Add focused tests for ready, blocked, renderer, profile, forced historical fallback, routes, catalog, and barrel behavior.
- Refactor repeated live-window test construction into `test/support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.ts`.
- Add `e/912` through `e/936` explanation files and code walkthroughs 917-941.

## Validation Plan

Completed during v936 closeout:

- `npm.cmd run typecheck`: passed.
- focused fresh sibling intake test: 1 file, 5 tests passed.
- focused v886/v911 adjacent route/catalog/barrel batch: 6 files, 34 tests passed.
- adjacent controlled-preview batch plus minimal route: 23 files, 96 tests passed.
- `npm.cmd run build`: passed.
- `dist` must be removed before commit.

The full vitest suite is intentionally not run as one huge local batch in this package because earlier local runs left a large worker tree. The verification strategy is focused, adjacent, typecheck, build, and remote CI after push.

## Parallel Guidance

Java can continue its own read-only import-preflight follow-up work after v608. mini-kv can continue its own route preview import-preflight follow-up work after v560. Node is not a pre-approval blocker for either project.

If Node later needs fresh Java or mini-kv evidence, the plan must name exact upstream versions, expected files, fallback fixture paths, and whether live integration is required. If live integration is required, the plan must also name service owner, port, startup command, cleanup command, and evidence capture route before any service is started.

## Next Direction

After v936, do not jump straight into real execution. The better next layer is a value-supply design that remains disabled by default:

- a typed operator value envelope with redaction and missing-value policy;
- explicit source evidence provenance per supplied value;
- no automatic sibling import;
- no runtime payload acceptance;
- no live execution until a separate approval packet exists.

Maintenance should continue alongside functionality: keep evidence catalogs, slot templates, artifact gates, renderers, and profile types split as separate ownership groups.
