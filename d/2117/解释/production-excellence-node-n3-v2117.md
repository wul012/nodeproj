# v2117 production excellence N3 archive note

本版本完成 N3: production boundaries and release discipline。

## 产物

- `docs/PRODUCTION_BOUNDARIES.md`: 明确当前 Node 仍是只读证据和控制面排练系统，生产执行没有授权，Java / mini-kv 启动和写入也没有通过 Node 授权。
- `CHANGELOG.md`: 建立版本纪律，说明 git tag 是项目阶段版本主线，`package.json` 继续保持 `0.1.0`，以后只有真正进入包发布流程时才调整该政策。
- `fixtures/MANIFEST.md`: 标记 Java / mini-kv historical sibling fixtures 为 load-bearing frozen evidence，禁止当作普通杂物重命名、挪动、覆盖或格式化。
- `test/productionExcellenceDocs.test.ts`: 用 focused test 锁住生产边界、版本政策、fixture 保护和 AGENTS 收尾规则。
- `AGENTS.md`: 版本收尾规则增加 CHANGELOG 更新要求。
- `docs/plans/production-excellence-node-playbook.md`: N3 进度行标记完成。

## 边界

本版本不改变运行时代码，不启动 Java / mini-kv，不打开 upstream probes/actions，不授权 production execution。Java 和 mini-kv 可以继续并行推进自己的质量整治；Node v2117 只是把生产前边界、冻结证据和版本纪律写成可检查文档。

## 验证

- Focused docs test: 1 file / 4 tests passed.
- Typecheck: passed.
- Lint: passed, 0 errors / 263 existing warnings.
- Coverage: passed, 525 files / 1616 tests, statements 95.81%, branches 87.38%, functions 98.38%, lines 95.78%.
- Build: passed.
- Local HTTP smoke: not applicable for this docs-only version; pushed CI still runs the standard Node Evidence HTTP smoke.
