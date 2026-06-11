# Node v2081 说明：操作者窗口工作表

## 版本定位

v2081 把 v2080 的 failure matrix 转成操作者可以执行前检查的有序 worksheet。它的作用是防止 readiness report 被误读成“窗口已批准”，同时给下一版 archive verification 一个清晰的步骤来源。

## 关键实现

- 服务：`src/services/productionShardExecutionOperatorWindowWorksheet.ts`
- 路由：`/api/v1/audit/production-shard-execution-operator-window-worksheet`
- 来源：Node v2080 failure matrix

工作表固定五步：

1. 锁定 v2078-v2080 digest
2. 确认签名批准仍缺失
3. 确认 Java/mini-kv owner lifecycle
4. 记录只读 probe outcome
5. 记录 cleanup proof 或 no-start proof

这五步把“人要看什么、谁负责、什么时候归档”放在一起，不再让执行窗口依赖散落的文字说明。

## 安全边界

worksheet 不会开启生产窗口。它明确保留签名批准缺口，并要求 Java/mini-kv owner 继续负责自己的服务生命周期。

## 验证结果

归档证据：

- `e/2081/evidence/production-shard-execution-operator-window-worksheet-v2081-http.json`
- `e/2081/evidence/production-shard-execution-operator-window-worksheet-v2081-http.md`
- `e/2081/evidence/production-shard-execution-operator-window-worksheet-v2081-summary.json`

本版本的工程意义：把候选链从机器可读的矩阵推进为操作者可审的窗口清单。
