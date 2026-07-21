# v2232 判定边界收敛说明

## 目标

本版处理全仓复杂度最高的一组 `createChecks`、reference 与 release gate 热点。目标不是减少检查数量，
而是把文件读取与响应装配、领域判定、通用严格取值三种职责分开，使缺失、错类型和冲突证据继续失败关闭。

## 结构

四类归档判定进入 `src/services/archiveVerification/`。`kernel.ts` 只提供严格路径读取、布尔集合、ID 集合、
digest 形状和有序对象合并；decision、closure、intake、integration 文件保留各自字段、文字、计数和边界。
原服务仍拥有文件读取、来源解析、最终 ready 聚合与响应对象，因此新目录不是第二套服务入口。

相邻 echo、release/retention、readiness reference 与 abort/rollback 也按连续语义分组。最终检查对象仍按原键序
合并，测试期望、fixture 和 normalizer 均未修改。新增 kernel 单测证明错误容器不会被宽松转换为通过，
同时锁定组间键序与 64 位十六进制 digest 规则。

## 收益与边界

maintainability 从 `81/79/208/0` 收紧到 `73/72/193/0`，最大函数从 171 行降至 163 行，最大复杂度
从 85 降至 59。name debt 仍为 4,444，受管 family 仍为 52，源码超过 800 行、导入环和非豁免 renderer
仍为零。没有新增路由、网络、写入、权限或执行能力；页面没有变化，截图不适用。

21 个聚焦文件共 64 项测试、typecheck、零告警 lint 与全部静态 census 已通过。九分门仍诚实报告六个红项，
本版不会据此自称九分。Java 与 mini-kv 可独立并行，Node 不要求新鲜兄弟证据，也不是它们的批准前置。

批次完整回归按四个顺序 shard、每片最多四个 worker 通过 586 个文件与 1,805 项测试；build 通过。默认
安全模式验证 health、零请求 metrics 与 release readiness，强制 access guard 和 historical fallback 模式
验证受保护归档 21/21、Markdown 200 且 execution=false。两个本地服务均按 PID 关闭，远端 coverage/CI
在提交推送后复核。
