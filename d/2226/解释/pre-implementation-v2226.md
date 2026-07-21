# v2226 预实现计划回声验证边界收敛说明

## 为什么要做

旧预实现回声验证文件有 758 行，同时负责读取 Node v270、扫描 Java v112 文本证据、解析 mini-kv v119 JSON 回执、执行 22 项跨项目判定、生成三类消息、计算摘要并组装公共响应。它还用完整业务句子命名生产文件、类型和导出。功能虽然稳定，但任何字段问题都要在同一文件的多种责任之间来回排查，并已有一个近限文件、四个长函数和两个复杂函数进入只减不增账本。v2226 的目的不是增加报告，而是让模块边界与证据所有权一致。

## 实际改造

`src/services/preImplementation/` 现在以十个局部文件承接上下文。`verification.ts` 只有十八行，依次建立 Node source、Java echo、mini-kv receipt、checks 和 profile；`sourceNode.ts` 只收窄 Node v270；`javaEcho.ts` 用有序 snippet 规格解释五份证据；`miniKvReceipt.ts` 保留直接的 nullable 字段读取，不用会注入 fallback 的通用 mapper；`checks.ts` 按 source、版本、credential、endpoint、resolver、connection、write 和 auto-start 边界组织谓词；`messages.ts` 独占策略文字；`profile.ts` 独占公共键序和 digest；`planEchoRenderer.ts` 只负责展示并遵守 renderer census 的可发现命名约定。

本版是第三个需要 aggregate readiness 的 bounded context，因此原 `operatorLifecycle/checkAssembly.ts` 提升为 `src/services/reportCheckAssembly.ts`。它仍不理解版本、route 或领域字段，只要求 readiness 键存在、证据非空且每项严格等于 `true`，并保持输入不可变和现有键序。五条调用链现在共享同一机制，领域 predicate 仍各归其主。

## 合同与失败关闭

HTTP route、profileVersion、公共 JSON 字段、checks 顺序、blocker/warning/recommendation 文本、digest 输入、Markdown 和安全假值全部不变。拆分中固定时钟 oracle 曾发现 readiness 公共字段被机械短名误伤：READY 输出少 434 字节，摘要立即变化。实现随即恢复原公共字段，只保留 TypeScript 内部函数与文件短名；没有更新 fixture 或期望来迁就错误。

最终 `2026-07-21T00:00:00.000Z` 下，READY JSON/Markdown 保持 52,250/51,719 字节，SHA-256 分别为 `fa1bedae...78b00` 与 `8fb687c2...e2f9c`；打开 upstream probes/actions 的 BLOCKED 场景保持 53,007/52,252 字节，摘要为 `89a9b923...a0f8` 与 `e1aabda5...ec80`，并继续得到 16/22 checks、21/26 source checks 和四个 blocker。local 与强制 historical fallback 均复验。

## 维护结果

目标家族十四条文件/导出命名债归零，全仓命名债从 4,475 收紧到 4,461，文件债从 970 降到 966，导出债从 3,505 降到 3,495。维护性账本从 83/94/213/0 收紧到 82/90/211/0：一个近限文件、四个长函数和两个复杂函数消失，替代模块没有新的长函数、复杂函数或导入环。所有 touched 源文件低于 600 行，公开内部 API 均不超过四十字符；保留的超长 JSON 属性属于既有外部合同，不以“优雅”为名破坏兼容性。

## 并行与截图

本版只读取仓内既有 frozen historical evidence，不需要 Java 或 mini-kv 生成新版本，两项目推荐并行推进，Node 不是它们的审批阻塞方。本版未启动、停止、构建或修改兄弟项目，也没有增加网络、写入、凭据、raw endpoint、连接或执行权限。变化全部是 TypeScript 责任边界且没有 HTML/UI，截图不能证明字节等价或失败关闭，因此不创建图片目录；固定输出摘要、focused tests 和静态 ratchet 是更直接的证据。
