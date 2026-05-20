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
- `c/262/`：sandbox endpoint credential resolver disabled precheck，记录 6 个 env handles、2 个 opt-in gates、7 个 failure classes、12 个 dry-run fields，以及继续阻断 resolver client / secret provider / external request 的验证。
- `c/263/`：sandbox endpoint credential resolver disabled precheck upstream echo verification，记录 Node v262、Java v106、mini-kv v115 的 disabled precheck 三方对齐、historical fallback 和 shared evidence helper 优化。
- `c/264/`：sandbox endpoint credential resolver test-only shell contract，记录 fake in-memory resolver shell 的 handle-only request、fake-only response、failure mapping、guard conditions 和 no-side-effect probe。
- `c/265/`：sandbox endpoint credential resolver test-only shell upstream echo verification，记录 Node v264、Java v107、mini-kv v116 的 request / response / failure mapping / guard / fake probe 三方对齐，并把 Java v109 records split 作为非硬前置优化上下文。
- `c/266/`：credential resolver fake-shell archive verification，记录 Node v264/v265 HTML、截图、解释、代码讲解、route response 和 active plan 片段的只读归档验证；不重新执行 fake resolver shell。
- `c/267/`：credential resolver fake-shell archive upstream echo verification，记录 Node v266、Java v110、mini-kv v117 的 archive count / snippet count / no-rerun / no credential / no resolver / no connection / no write / no auto-start 三方对齐。
- `c/268/`：credential resolver production readiness decision gate，记录 Node v267 source chain ready，但真实 resolver pre-implementation 因 10 个硬边界缺失继续 blocked。

## v269 补充记录

- `c/269/`：credential resolver blocked-decision upstream echo verification，记录 Node v268、Java v111、mini-kv v118 的 blocked decision、counts、missing requirements 和 no-side-effect 边界三方对齐；真实 resolver、credential value、raw endpoint、managed audit connection 和写操作仍关闭。
- `c/270/`：credential resolver pre-implementation plan intake，记录 10 个 defined-for-review boundary、plan digest、intake digest 和继续阻断真实 resolver / secret provider runtime / credential value / raw endpoint / external request / schema migration / ledger write 的验证。
- `c/271/`：statusRoutes split quality pass，记录 `statusRoutes.ts` 第一刀拆分、10 条 upstream fixture / production evidence intake 只读路由迁移，以及 API path / response shape 保持不变的验证。
