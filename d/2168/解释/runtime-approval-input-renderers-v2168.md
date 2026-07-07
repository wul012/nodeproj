# v2168 说明：runtime approval input renderer 标准化

v2168 继续推进 N1 renderer consolidation，把 runtime execution approval input 链条里的四个完整 Markdown renderer 迁移到 `renderVerificationReportMarkdown`：intake contract、completion intake、template validator、canonical approval input value validation。本版不改变路由、schema、历史证据读取、Java/mini-kv 输入判断或真实执行权限，只把手写 H1/meta/H2/list 外壳收进统一 builder。

本版覆盖四份输出，均使用 forced historical fixture fallback、固定 `generatedAt`、归一化 JSON path/resolvedPath 后做 SHA-256、长度、H1/H2/H3 和尾换行断言。四个稳定 hash 分别是 `c61e8534ce44c00f90a8089fe91ab6b5b7b1be78184f4dc9319f0ed353b7a97c`、`320fde7f1dfd3362884460f30f6b051f887c1e32f6010b67e423fb0a7d90f85d`、`d7b4684c5f837e159395de3a176ee0e594752625b7b3eb830f18fa73491dd73f`、`738ef8fcae785e6a63404a19249bd78f244273ad5a6b31aa0ab9ef48758b4bd7`。

验证已通过 v2168 focused gate、renderer census 和 typecheck。Renderer census 从 196/245 标准化推进到 200/245，未标准化 renderer 从 49 降到 45，剩余 flatMap signal 从 40 降到 33，H3 继续保持 0。Java 和 mini-kv 在本版仍是 recommended parallel，因为本版只处理 Node 本地展示层，不要求新鲜 sibling output。
