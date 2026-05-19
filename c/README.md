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
- `c/251/`：manual sandbox connection decision record，记录七个决策字段、八个 no-go 条件和继续阻断真实连接的验证。
- `c/252/`：disabled adapter client precheck，记录 required env handles、opt-in gate、failure taxonomy、dry-run response shape 和不连接真实 managed audit 的验证。
- `c/253/`：test-only adapter shell contract，记录 fake in-memory transport、request/response shape、failure mapping、guard conditions 和不发真实 external request 的验证。
- `c/254/`：disabled adapter client upstream echo verification，记录 Node v252/v253、Java v102、mini-kv v111 的三方只读对齐，以及继续阻断真实 managed audit connection 的验证。
- `c/255/`：fake transport adapter dry-run verification packet，记录 request/response、timeout budget、failure mapping、cleanup 和继续阻断真实 managed audit connection 的验证。
- `c/256/`：fake transport packet archive verification，记录 v255 HTML、截图、解释、代码讲解、route digest、cleanup evidence 和 active plan 片段验证。
- `c/257/`：fake transport packet upstream echo verification，记录 Node v255/v256、Java v103、mini-kv v112 的三方 request/response/timeout/cleanup/side-effect 边界对齐。
- `c/258/`：sandbox endpoint handle preflight review，记录 endpoint handle、credential handle、network/TLS/redaction/operator window review，以及继续阻断真实 managed audit connection 的验证。
- `c/259/`：sandbox endpoint handle upstream echo verification，记录 Node v258、Java v104、mini-kv v113 的 handle / policy / no-side-effect 三方对齐，以及继续阻断真实 managed audit connection 的验证。
- `c/260/`：sandbox endpoint credential resolver decision record，记录 resolver policy handle、approval marker、8 个决策字段和 9 个 no-go 条件，以及继续阻断 credential value / raw endpoint / managed audit connection 的验证。
- `c/261/`：sandbox endpoint credential resolver upstream echo verification，记录 Node v260、Java v105、mini-kv v114 的 resolver policy / approval / decision fields / no-go conditions / no-side-effect 三方对齐，以及 UTF-8 BOM evidence 读取修复。
