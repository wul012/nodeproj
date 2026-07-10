# v2188 evidence service 体积边界拆分

v2188 在 v2187 CI 全绿后开始，不携带红色版本继续写入。本版把六个 service 中的
冻结 sibling 路径、局部 evidence 类型、JSON 读取与确定性映射移到 `src/evidence`，
loader、checks、消息聚合、digest 与公开 renderer 入口仍保留在原文件。

六个主文件由 814–905 行降至 718–779 行，新模块只有 69–180 行。source-size
census 从 10 收缩到 4，baseline 同步删除六项；service/route 文件数仍为 1125/80，
lint 仍是 0 error/263 warning。本版没有修改既有期望、fixture 或报告字段。

剩余四项由 v2189 处理：dashboard client、status routes、rehearsal guard 与真实读取
runtime packet。Java 与 mini-kv 继续 recommended parallel，本 session 不操作它们。
