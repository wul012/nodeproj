# Node v2104 roadmap: control-plane-map-readability-maintenance

## Purpose

新增 docs/architecture/control-plane-map.md，把 Node 控制面的 audit、access policy、route catalog、quality gate、shard preflight 五类能力放到同一张阅读地图里。

## Scope

- Maintenance-only readability work.
- No Java or mini-kv live service startup.
- No production execution.
- Keep route/service/test ownership visible.

## Cross-project progress

Java and mini-kv are recommended parallel. Their working trees were checked read-only and do not block this Node maintenance version. aiproj was observed read-only because its suggestion file explains naming stop-work, but this Node plan does not include aiproj source edits.

## Validation

- Focused readability profile and route catalog tests.
- f-folder explanation quality gate after archive generation.
- code walkthrough documentation quality gate after walkthrough generation.
- typecheck, build, HTTP smoke, and CI after batching.

## Stop condition

Stop after the map/profile explains the maintenance boundary without adding another governance chain. If a future version cannot produce a substantive Chinese explanation, enlarge the actual engineering work instead of padding prose.
