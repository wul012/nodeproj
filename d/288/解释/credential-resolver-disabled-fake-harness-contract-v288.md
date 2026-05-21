# Node v288 说明

本版定义 disabled fake harness contract，但不提供可执行 fake harness runtime。

## 结论

- 合同状态：disabled-fake-harness-contract-ready
- Java 回显需求：true
- mini-kv 回显需求：true
- 推荐并行：Java v122 + mini-kv v127

## 核心边界

- runtimeImplementationPresent=false
- runtimeInvocationAllowed=false
- 不读取 credential value
- 不解析 raw endpoint URL
- 不实例化 real/fake provider/client
- 不发外部 HTTP/TCP 请求
- 不连接 managed audit
- 不写 approval ledger
- 不执行 schema migration
- 不自动启动上游

## 后续建议

Node v288 完成后，推荐并行 Java v122 + mini-kv v127；Node v289 等两侧证据完成后再做 upstream echo verification。
