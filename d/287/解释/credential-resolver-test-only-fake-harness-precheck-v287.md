# Node v287 说明

本版只做 test-only fake harness precheck，不把 fake harness 变成真实执行入口。

## 结论

- 预检状态：test-only-fake-harness-precheck-ready
- Java 即时回显需求：false
- mini-kv 即时回显需求：false

## 核心边界

- 不读取 credential value
- 不解析 raw endpoint URL
- 不实例化真实 secret provider / resolver client
- 不发外部 HTTP/TCP 请求
- 不连接 managed audit
- 不写 approval ledger
- 不执行 schema migration
- 不自动启动上游

## 后续建议

Node v288 再定义 disabled fake harness contract；之后再按计划推荐并行 Java v122 + mini-kv v127。
