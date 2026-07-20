# Node v2216 归档说明

## 改造目标

`src/app.ts|buildApp` 原来在 213 行内同时创建 Fastify、映射错误、安装访问与审计 hook、
构造 16 类运行时依赖并注册 15 个路由阶段。它不是业务算法，却拥有整个进程的对象身份和
先后顺序；任何局部修改都要求审查完整函数。v2216 把这些职责分为 shell、request hooks、
runtime deps 与 route stages，公开 `buildApp(config)` 签名保持不变。

## 契约冻结

源码改动前先从真实 `buildApp` 取得 Fastify 路由树：41,596 bytes、460 行、SHA-256
`e8fbc705761b2cf5f774d18e4879caf1b46ee6cb11046f4acdb71d6bbd778de9`。新测试还冻结
dashboard 至 mini-kv 的 15 个装配阶段。重构后两层 oracle 同时通过，说明路由集合和内部
注册序列都未漂移。

第二项测试验证全局 service/request/access headers、OPTIONS 204、允许方法以及通用 500
错误体。既有 access guard、audit context、dashboard、metrics、action plan、preflight、
approval、intent、dispatch 和 status 测试组成 16 文件 54 项代表矩阵，全部通过。

## 新的职责边界

`createAppShell` 只创建 Fastify 和错误处理器；`requestHooks` 维护访问 guard、operator
identity、CORS、计时与 audit record；`runtimeDeps` 按旧代码的精确顺序创建 clients、store、
ledgers 和 snapshots；`registerRoutes` 用有序 stage manifest 调用现有 route registrars。
`src/app.ts` 现在只有 10 行组合流程，能直接看出生命周期顺序。

依赖工厂返回的都是同一对象引用。approval decision 仍消费同一个 approval request ledger，
dispatch 仍消费同一个 intent store，audit routes、status routes 与 response hook 仍共享同一个
audit log。没有引入 DI 容器、service locator 或第二份状态。

## 可维护性与安全

账本由 85/107/226/0 收紧到 85/106/226/0。最大替代函数 63 行、复杂度 1，所有新函数
复杂度不高于 3，没有把 213 行入口搬成另一个长函数。路由、schema、fixture、access policy、
配置默认值、上游连接和执行权限均未改变。Java/mini-kv 不提供新鲜证据，可独立并行；本版
没有 HTML/UI 变化，因此不创建截图目录。
