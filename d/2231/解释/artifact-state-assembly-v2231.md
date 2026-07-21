# v2231 controlled-shard artifact state 与 assembly 说明

## 目标与非目标

本版承接 v2230 的提交切片，处理 intake、review、submission、comparison 四个连续 artifact builder。
目标是把“取得目录/控制项/门、构造 digest 输入、组装响应”三类职责分开，使本批长函数累计净减十个。
非目标是修改字段、摘要算法、ready 语义、路由或任何生产执行边界。

## 结构

四个公共入口保留原路径、名称、参数和返回类型，现在约 17 行，只编排 fields/criteria/slots/lanes、
controls、gates 与 blocked reasons。各文件有一个 33-36 行 digest input helper，以及一个 72-77 行
response assembler。字段顺序和对象键顺序仍在对应领域文件中显式可见。

新 `shardArtifactState.ts` 只把 `blockedReasons.length === 0` 转为 ready，并对调用方给出的领域对象执行
`sha256StableJson`。它不识别阶段、版本、字段或结果类型。直接单测覆盖空/非空 blocker 与对象键顺序
无关的 digest；四个领域测试继续覆盖各阶段目录、门和响应合同。

## 证据与收益

固定时间下 ready/probes-disabled 两个完整 profile 的 JSON/Markdown hash 前后不变，四个领域测试共
21 项通过；没有修改期望、fixture 或 normalizer。maintainability 从 81/83/208/0 收紧到
81/79/208/0，v2230-v2231 累计长函数 89->79，完成净减十个的原目标。触及范围最大函数 77 行、
复杂度 2；全仓 171 行最大函数属于下一版 complexity 84 的 `createChecks`。

name debt 4,444、52 个受管 family、零导入环和零个 >800 行源码保持不变。Java 与 mini-kv 可并行，
Node 不消费新鲜上游证据。本版无页面变化，截图不适用。
