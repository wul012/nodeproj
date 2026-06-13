# v2137 renderer consolidation batch 20

v2137 继续推进 N1 renderer consolidation，把 `auditStoreEnvConfigProfile.ts` 和 `auditStoreRuntimeProfile.ts` 两份 audit-store 基础治理报告迁移到 `verificationReportBuilder`。这两份报告都是 Node 自身审计存储边界的只读说明：一个说明环境配置是否已经具备 durable audit migration 前提，另一个说明当前运行时仍然怎样实例化 audit store。

本版没有新增路由、没有修改 schema、没有启动 Java 或 mini-kv，也没有放开任何真实执行能力。迁移只收走重复 Markdown 外框：标题、meta、标准 entries section、Evidence Endpoints 和 Next Actions。两类局部语义继续留在原文件：source-less message 行因为没有 `source` 字段，不能套 builder 的标准 message section；runtime 的 `Stores` section 因为内部有 `###` 店铺式子块和尾部空行协议，继续用本地 `renderStore` 生成后作为 raw lines 输入 builder。

已完成验证：`npm run typecheck` 通过；`test/auditStoreEnvConfigProfile.test.ts` 和 `test/auditStoreRuntimeProfile.test.ts` 共 2 个 focused 文件 / 5 个测试通过；临时逐字节对比覆盖 2 个文件、5 个 profile，确认 memory/file/database config 与默认/file runtime 输出和 `git show HEAD:<path>` 旧 renderer 完全一致。Java / mini-kv 继续推荐并行推进，本版不是它们的前置审批门。
