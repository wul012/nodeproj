# Node v2237：私有类型表面、历史证据冻结与九分验收

本版把 controlled read-only shard preview 的私有类型 barrel 从 352 个 named re-export 收缩为 37 个真实消费项。主 facade 仍直接导出 4 个核心类型，全仓实际消费面共 41 个名字。永久 AST ratchet 会拒绝无人消费导出、缺失导入、重复导出、private wildcard、namespace/default import 和缺失来源模块；原类型声明、稳定入口、route 与 schema 均未改名。

终局测试发现 v2236 曾让完整 preview parity 改变。逐标签复现证明 v2232 至 v2235 通过、v2236 首次失败；递归字段比较又证明业务值完全一致，原始差异只有一个文件的 `sizeBytes` 与 `digest`。原因是名为 Node v961 的历史证据仍读取当前可变源码，v2236 的等价重构因此造成 236 个派生摘要级联变化。测试期望和维护 baseline 都没有放宽。

修复把真实 `v961` Git blob 原样冻结为 `fixtures/historical/node/v961/value-supply-envelope-artifacts.ts.snapshot`。快照与 v961 的 blob 都是 `260776b475fd113203b79c1e753be2254e275052`，当前源码则恢复为 v2236 的共享规则实现，blob 都是 `89b94e396557218a01833fdbdd3de9ed9d461dc3`。历史读取层只对这一个精确路径使用冻结内容，报告里的声明路径保持不变，因此 parity、历史真实性和维护门同时成立。

本地终局验证已经完成：四个顺序 shard 在最多 4 个 worker 下通过 592 个文件、1,817 项测试；coverage 同样通过 592/1,817，语句 95.77%、分支 90.06%、函数 98.54%、行 95.75%。typecheck、零警告 lint、build、security 18/18、archive 64.74/80 MiB、全部静态门与 `npm run elegance:nine` 均通过，最终维护指标为 70/69/165/0，name debt 4,130。

默认安全 smoke 验证 health、零上游请求和 release archive ready=true/execution=false。强制 access guard 与 historical fallback smoke 验证带完整身份头的 health、preview JSON、Markdown 均为 200，preview 保持 blocked，服务启动、执行与写路由全部为 false；无身份请求返回 401，冻结 v961 元数据为 11,741 字节和预期 SHA。两个服务均按 PID 停止。Java 与 mini-kv 可继续并行，本版不要求新鲜 sibling 证据。远端 Node Evidence 将在 v2237 提交、tag、push 后执行，成功前状态仍是“本地通过，等待远端 CI”。

本版没有截图：改动没有新增 UI 或页面，既有 JSON/Markdown 路由已由 HTTP smoke 直接验证。
