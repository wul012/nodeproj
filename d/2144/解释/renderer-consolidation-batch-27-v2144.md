# v2144 渲染器整合批次 27 — 简要说明

把最后一个「纯标准且有测试」的渲染器迁移到共享 `verificationReportBuilder`：

- `...CredentialResolverMinimalShardReadinessLiveReadGateRenderer.ts`（最小分片就绪 live-read 门）

特点与首创：
- **首个使用 builder `lines` 小节类型**的迁移：两段 `## Java Live Read` / `## mini-kv Live Read`
  原由本地 `renderLiveRead` helper 产出 `string[]`，映射为 `{ heading, lines: renderLiveRead(...) }`。
- 加载器为 **async**，需 `OrderPlatformClient` / `MiniKvClient` 做只读 live-read。
- 保留 `renderLiveRead` helper 与观测类型导入，移除未用的 `renderEntries/renderList/renderMessages`。
- 19 条元信息 + 10 小节；net −28 行（37 增 / 65 删）。
- 既有 367 行测试（3 用例：ready/fake 客户端、探针关闭 fail-closed、mock HTTP/TCP 路由注入）+
  ratchet 全绿（2 文件 5 用例）；不新增测试。
- 测试用 `toContain` 断言，故另用一次性 async harness 做渲染前后字节对比：差异仅落在运行时
  `- Generated at:` 行，19 元信息与两段 live-read 小节逐字节相同；harness 与 `.tmp/` 已删除。

## 拐点：纯标准子集清零

迁移后按更正口径重新普查 108 个未迁移渲染器：纯标准（无 for/h3/map/flatMap）renderer 为 **0**
（有测试 0、确无测试 0）。剩余形态分桶（重叠）：for 9、h3 50、map 67、flatMap 63。下一批
（v2145）须正式做方向决策——路线 A（用 `lines` 小节承载 h3/for 行块，逐字节但结构化收益打折）
或路线 B（扩展 builder 使 entries 接受 `[label,value]` 数组，吸收 map/flatMap 渲染器，需自带
测试与字节对比）。建议显式与用户确认后再动手。

详见 `代码讲解记录_生产雏形阶段3/r2000/2115-renderer-consolidation-batch-27-v2144.md`。
