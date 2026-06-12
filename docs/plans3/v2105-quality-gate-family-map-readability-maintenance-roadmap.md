# Node v2105 roadmap: quality-gate-family-map-readability-maintenance

## Purpose

新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。

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
