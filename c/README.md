# OrderOps Node 运行调试归档 c

本目录从 Node v161 开始使用，与旧目录 `a/`、`b/` 同级。

用途：

```text
保存后续版本的运行调试截图和运行解释材料。
```

目录结构：

```text
c/<版本>/图片
c/<版本>/解释
```

写入规则：

```text
从 v161 起，运行调试截图和运行解释默认写入 c/。
a/ 保留早期历史归档。
b/ 保留 v107-v160 的历史运行调试归档。
代码讲解继续写入对应阶段目录，例如 代码讲解记录_生产雏形阶段/。
```

安全边界：

```text
运行调试仍默认使用 UPSTREAM_PROBES_ENABLED=false。
运行调试仍默认使用 UPSTREAM_ACTIONS_ENABLED=false。
截图默认使用本机 Chrome / Chromium。
不自动启动 Java 或 mini-kv，除非当前版本计划和用户授权明确要求。
```

## 最近归档

- `c/248/`：managed-audit sandbox code health pass，记录 v247 fallback、route table 和大文件拆分 checklist。
- `c/249/`：Dependabot security maintenance，记录 npm + GitHub Actions 自动依赖维护配置、测试和安全边界。
- `c/250/`：manual sandbox connection rehearsal guard，记录三项目安全维护批次对齐后的连接前人工守卫。
