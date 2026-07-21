# Node v2220 归档说明

## 改造目标

本版治理维护性基线中第三高的复杂函数：disabled candidate upstream echo policy 的
`createChecks`。旧函数用 149 行、复杂度 100 的连续条件同时表达 source review、三方计数、
边界 code、interface shape、fake wiring 和六类副作用边界。改造后，25 个 checks 的稳定组合顺序
留在入口函数，各领域判断进入具名谓词，纯布尔字段复用类型安全的共享执行器。

## 入口、模型与流程

公开入口仍为
`src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts`，
核心加载与 renderer 均未修改。策略实现位于
`src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationPolicy.ts`。
它继续消费 Node v273、Java v113、mini-kv v120 和两个 runtime 开关，输出原有 25 个 checks。

source review、candidate counts、三组 boundary codes、interface shape、fake wiring、credential、endpoint、
resolver、connection、write 和 auto-start 分别由具名函数拥有。字段规格使用 `as const` 并由
`allBooleanFieldsAre` 的泛型约束；nullable receipt 字段继续严格要求 `=== true`，缺失值不会被当成通过。
blocker 规则数组的顺序、code/source/message 保持原样，只把重复 filter/map 交给已有
`collectFailedReportRules`。

## 等价与失败证据

`test/resolverEchoParity.test.ts` 在修改源码前先冻结两条完整路径。ready profile 保持 25 checks，
JSON/Markdown 分别为 51,391/50,911 字节及原 SHA-256。probes/actions 同时开启时，source profile
连带产生四个有序 blocker：`SOURCE_NODE_V273_NOT_READY`、`CANDIDATE_COUNTS_NOT_ALIGNED`、
`UPSTREAM_PROBES_ENABLED`、`UPSTREAM_ACTIONS_ENABLED`；blocked JSON/Markdown 仍为
52,245/51,554 字节及原摘要。源码改动后 oracle 与原业务、fallback、route 测试合计 2 文件
7 项全部通过。

维护性账本从 85 / 101 / 224 / 0 收紧为 85 / 100 / 223 / 0。策略文件中没有新的超 120 行
函数或复杂度超 20 函数；typecheck 曾主动拦截两个 nullable 字段的普通 truthy 写法，修复为原合同的
严格 true 后通过，证明类型检查确实保护了失败关闭语义。

## 安全、并行与停止条件

本版没有修改 fixture、路由、renderer、运行配置或批准边界，没有实现 real resolver，没有读取凭据、
解析原始 endpoint、连接 managed audit、写存储或自动启动服务。Java v1881 与 mini-kv 用户文档工作树
保持不动，两项目可独立并行。没有 UI 变化，因此不创建图片目录。

本版在 ready/blocked 完整 oracle、原 focused tests、typecheck、零警告 lint、静态门、ratchet 和中文
讲解门通过后停止。下一版转入 v111 evidence reader 与 691 行服务拆分，不在本版扩大合同范围。
