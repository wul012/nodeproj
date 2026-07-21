# v2227 预检上游回执边界收敛说明

## 为什么继续处理这一链

Step-0 发现计划中的“758 行单文件”描述已落后于现实：目标链此前已经被部分拆成七个平铺生产文件，但 363 行 references 仍包含一个 153 行、复杂度 95 的 mini-kv builder，207 行 policy 仍有复杂度 38 的 `createChecks`，Java builder 复杂度仍为 21，文件和导出合计还有十七条超长命名债。因此本版没有机械执行过时描述，而是保留原目标，按真实结构重新切片。

## 实际结构

新 `src/services/precheckReceipt/` 用十个短职责文件承接上下文。`verification.ts` 只编排；`sourceNode.ts` 只收窄 Node v245；`javaEcho.ts` 解释 Java v99 文本证据；`miniKvReceipt.ts` 解释 mini-kv v108 JSON；`checks.ts` 拥有有序风险判定；`messages.ts` 拥有策略文字；`profile.ts` 拥有公共键序、摘要和 digest；renderer 只格式化 Markdown。调用者迁移到短 API，没有保留超长 alias。

mini-kv 的 root-over-nested 兼容字段明确使用 `??`。显式空串、零与 false 是上游真实值，不能被 nested 值覆盖；缺失或错类型则使用会令安全检查失败的默认值。字符串数组只有在原值确为数组且每一项都是字符串时才接受，混合数组不会被过滤后误判为完整集合。负向单测把这两类行为固定下来。

## 合同证明

固定 `generatedAt` 且强制 historical fallback 后，READY JSON/Markdown 仍为 21,595/21,169 字节，SHA-256 分别为 `f4ca082735d59dd441b96055dfed43b88a05885e1c118c6729d54fc70b685563` 与 `3601456362c2decc6a5a69678c135ea895ede65a830f175550f422636012f30d`。打开 upstream actions 的 BLOCKED 输出仍为 22,180/21,578 字节，摘要为 `16d588e7d67b0111dff4055396f3770eb31cf2538eb6540ed124a77aa1577fae` 与 `ff3b3a90dcea7a61ca4be3960bb928a72762c83ee527b3ece2feb68e0ac32892`。测试期望与 frozen fixture 均未修改。

`managedAuditSandboxCodeHealthPass` 的 live inventory 必须反映新真实路径，因此路径元数据及其派生 digest 合理变化；该报告的 readiness、checks、route、安全边界和下游 rehearsal 语义没有变化。此例外已在计划中预先声明，不能扩张为公共合同豁免。

最终分片验证还抓到一个跨版本回归：v2223 已把 workflow 的 `setup-node` 从 v4 升到 v7，但 workflow evidence verifier 仍把 v4 当成唯一合法值。修复发生在验证器而非测试期望：当前规则明确要求审定的 v7 与 Node 22，新增负向测试证明将 workflow 退回 v4 会关闭 `nodeSetupPresent` 并产生 `NODE_SETUP_MISSING` blocker。

## 维护结果与边界

目标十七条命名债归零，全仓命名债从 4,461 收紧到 4,444；维护性从 82/90/211/0 收紧到 82/89/208/0，一个长函数和三个复杂函数消失，没有替代热点、导入环或超过 800 行的源码。renderer 保持 242/245，三个未标准化文件仍全部具有 composition waiver。

本版不增加功能、路由、报告、网络、写入、凭据访问或执行权限，也不启动或修改 Java、mini-kv。两项目继续推荐并行，Node 只消费既有 frozen historical evidence。没有 HTML/UI 变化，截图不能证明 JSON 收窄与字节等价，因此不创建空图片目录；机器证据、负向测试和完整输出摘要是对应风险的直接证明。
