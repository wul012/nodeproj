# OrderOps Node 运行调试归档

本目录从 Node v107 开始使用，与旧目录 `a/` 同级。自 Node v161 起，新的运行调试截图和解释材料默认写入同级 `c/`，本目录作为 v107-v160 历史归档保留。

用途：

```text
保存每个版本的运行调试截图和运行解释材料。
```

目录结构：

```text
b/<版本>/图片
b/<版本>/解释
```

示例：

```text
b/107/图片/production-readiness-summary-v4.png
b/107/解释/production-readiness-summary-v4.json
b/107/解释/production-readiness-summary-v4.md
b/107/解释/说明.md
```

写入规则：

```text
v107-v160 的运行调试截图和运行解释默认写入 b/。
从 v161 起，新版本运行调试截图和运行解释默认写入 c/。
a/ 保留 v1-v106 的历史归档，不再作为新版本运行调试材料的默认目录。
代码讲解继续写入对应阶段目录，例如 代码讲解记录_生产雏形阶段/。
```

安全边界：

```text
运行调试仍默认使用 UPSTREAM_PROBES_ENABLED=false。
运行调试仍默认使用 UPSTREAM_ACTIONS_ENABLED=false。
截图默认使用本机 Chrome / Chromium。
不启动、不停止、不构建、不测试、不修改 Java 或 mini-kv，除非用户明确授权。
```
