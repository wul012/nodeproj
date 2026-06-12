# Node v2107 roadmap: f-folder-standard-closeout-readability-maintenance

## Purpose

新增 docs/architecture/f-folder-explanation-standard-closeout.md，把中文、3000 字、9000 bytes、路径引用、章节和禁止生产误述写成稳定标准。

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
