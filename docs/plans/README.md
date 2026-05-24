# OrderOps Node 计划文档目录

本目录统一保存 Node 后续版本计划、跨项目联调计划、阶段路线图和由某个版本衍生出的下一阶段开发安排。

## 当前唯一入口（先读这里）

```text
当前唯一有效全局计划：
docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md

当前状态：
Node v225 已完成 managed audit sandbox adapter dry-run package，并融合 auditRoutes 旧 JSON/Markdown 路由迁移。
Node v226 已完成 manual sandbox adapter connection runbook，只生成机器可读人工演练材料，不连接、不读取 credential value。
Java v86 + mini-kv v95 已推荐并行完成。
Node v227 已完成 manual sandbox connection evidence checklist，只验证材料完整性，不打开 managed audit 连接。
Node v228 已完成 manual sandbox connection operator packet，只生成 owner artifact / credential handle / rehearsal / rollback / timeout / abort marker 字段。
Java v87 + mini-kv v96 已推荐并行完成。
Node v229 已完成 manual sandbox connection packet verification，只验证 Node v228 packet 与两侧 marker 一致。
Node v230 已完成 manual sandbox connection preflight gate，只新增 manual window flag 和连接前 gate，不打开连接。
Java v88 + mini-kv v97 已推荐并行完成。
Node v231 已完成 manual sandbox connection preflight verification，只验证 preflight 字段和 no-start guard 是否对齐，不打开连接。
Node v232 已完成 ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合，契约输出字段不变。
Node 旧 managed-audit 沙箱链路已按 mini-kv current runtime fixture v98 对齐，同时保留历史 consumed digest / receipt 语义。
Java v89 + mini-kv v98 已推荐并行完成。
Node v233 已完成 manual sandbox connection rehearsal packet review，只读消费 Node v232 / Java v89 / mini-kv v98 证据，不打开连接。
Java v90 + mini-kv v99 已推荐并行完成。
Node v234 已完成 manual sandbox connection blocked execution rehearsal，并修复 v223-v234 旧沙箱链路对 mini-kv current runtime fixture v99 的滚动证据消费。
Java v91 + mini-kv v100 已推荐并行完成。
Node v235 已完成 manual sandbox connection precondition intake，并把 v223-v235 旧沙箱链路继续扩展到 mini-kv current runtime fixture v100。
Node v236 已完成 manual sandbox connection dry-run request envelope，只携带字段名和 marker，不读取 credential value、不打开连接。
Java v92 + mini-kv v101 已推荐并行完成。
Node v237 已完成 manual sandbox connection readiness gate，消费 Node v236 + Java v92 + mini-kv v101；readyForOperatorWindowChecklist=true，但 readyForManagedAuditSandboxAdapterConnection=false。
Node v238 已完成 manual sandbox connection operator window checklist；approvalItemCount=3、checklistStepCount=8、pauseConditionCount=8、forbiddenOperationCount=6，仍不打开连接。
Java v93 + mini-kv v102 已推荐并行完成，Java v94 / mini-kv v103 为优化 follow-up，不作为 Node v239 的新业务依赖。
Node v239 已完成 manual sandbox connection operator window evidence verification；消费 Node v238 + Java v93 + mini-kv v102，javaEchoAccepted=true、miniKvReceiptAccepted=true、checklistCountsAligned=true、boundaryFlagsAligned=true，仍不打开连接。
Node v240 已完成 route registration table quality pass；把 auditRoutes.ts 从 457 行降到 29 行，JSON/Markdown route 表拆到独立模块，只做质量优化，不新增业务 evidence 依赖。
Java v94-v97 与 mini-kv v103-v106 已完成各自优化收口，并已作为 Node v241 的质量上下文完成只读对齐。
Node v241 已完成 manual sandbox connection dry-run command package；消费 Node v239 + Node v240 + Java v97 + mini-kv v106，只生成默认 disabled 的 dry-run command package，不携带 credential value、不打开 managed audit sandbox connection。
Node v242 已完成 historical evidence fallback for GitHub CI；修复 v223/v224 旧计划链路依赖开发机 `D:/javaproj` 与 `D:/C/mini-kv` 历史文件导致 CI 返回 blocked 的问题。
Node v243 已完成 manual sandbox dry-run command package verification report；只读验证 v241 command package 与 v242 CI-stable fallback，没有打开 managed audit connection。
Java v98 + mini-kv v107 已推荐并行完成；Java 只读回显 command package，mini-kv 只读证明 non-participation / no-start / no-write。
Node v244 已完成 manual sandbox dry-run command upstream echo verification；只读验证 Node v243 + Java v98 + mini-kv v107 的 command count、disabled/dry-run、credential/connection/write/auto-start 边界一致。
Node v245 已完成 sandbox connection precheck packet；生成 owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy，仍不打开真实 managed audit connection。
Node v246 已完成 GitHub CI historical sibling evidence fallback repair；旧 managed-audit sandbox 链路不再依赖开发机 `D:/javaproj` 与 `D:/C/mini-kv`，forced fallback 聚焦测试已覆盖 GitHub runner 语义。
Java v99 + mini-kv v108 已推荐并行完成；Java 只读回显 Node v245 precheck packet，mini-kv 只读证明 precheck packet 不会导致 auto-start / write / credential read / restore / storage backend。
Node v247 已完成 manual sandbox connection precheck upstream receipt verification；只读消费 Node v245 + Java v99 + mini-kv v108，验证 precheck item count、operator field count/name、timeout policy、credential/connection/write/auto-start 边界一致，并补齐 v247 所需 committed sibling evidence fallback。

下一步：
当前批次是推荐并行安全维护：Node v249 + Java v101 + mini-kv v110。
Node v248 已完成 managed-audit sandbox code health pass：补 v247 verification service 边界/回归测试，写清 `statusRoutes.ts` / `dashboard.ts` / `opsPromotionArchiveRenderers.ts` 拆分验收清单，不新增真实连接 client。
Java v100 已完成 CI bootstrap；mini-kv v109 已完成 benchmark evidence guard。
Node v249 已完成 Dependabot/security maintenance：覆盖 npm + GitHub Actions，周更分组，忽略 semver-major 自动升级，并让 Node Evidence workflow 监听 `.github/dependabot.yml`。
Java v101 已完成 Dependabot/security maintenance：Maven + GitHub Actions，配置位于 Java git 根 `D:\javaproj\.github\dependabot.yml`，不改 release approval 业务语义。
mini-kv v110 已完成 Dependabot/security maintenance：覆盖 GitHub Actions，并用 CTest 守住不引入 npm/Maven/pip/cargo/Docker 等生态。
Node v250 已完成 manual sandbox connection rehearsal guard / three-project alignment：消费 Node v247-v249、Java v101、mini-kv v110，形成连接前人工守卫，仍不打开真实 managed audit connection。
Node v251 已完成 manual sandbox connection decision record：把 owner approval artifact、credential handle review、schema rehearsal approval、manual window marker、rollback path、abort marker、timeout policy 写成可审查的人工决策记录，并列出八个 no-go 条件；仍不读取 credential value、不打开 connection、不执行 schema migration、不启动 Java / mini-kv。
Node v252 已完成 disabled adapter client precheck：只定义 client boundary、required env handles、failure taxonomy、dry-run response shape 和 opt-in gate，不读取 credential value、不发真实外部请求、不连接 managed audit。
Node v253 已完成 test-only adapter shell contract：只定义 fake in-memory transport、request/response shape、failure mapping、guard conditions 和 fake transport probe，不读取 credential value、不请求真实 external endpoint。
Java v102 + mini-kv v111 已推荐并行完成：Java 只读回显 disabled adapter client precheck，mini-kv 只读证明 non-participation / no-start / no-write / no-credential。
Node v254 已完成 disabled adapter client upstream echo verification：消费 Node v252/v253、Java v102、mini-kv v111，验证 env handle、failure taxonomy、fake transport shape 和 no credential/no connection/no write/no auto-start 边界一致，并拆出 v254 types / renderer 降低新 service 膨胀。
Node v255 已完成 fake transport adapter dry-run verification packet：消费 Node v253/v254，验证 request/response shape、timeoutBudgetMs=15000、failureMappingCount=6、cleanupArtifactCount=0，并从一开始拆出 v255 types / renderer，仍不打开真实 managed audit connection。
Node v256 已完成 fake transport packet archive verification：只读验证 v255 HTML、截图、解释、代码讲解、route digest、cleanup evidence 和 active plan 片段，不重新执行 fake transport 行为。
Java v103 + mini-kv v112 已推荐并行完成。
Node v257 已完成 fake transport packet upstream echo verification：消费 Node v255/v256、Java v103、mini-kv v112，验证 request/response/timeout/failure/cleanup/side-effect 边界三方一致。
Node v258 已完成 sandbox endpoint handle preflight review：只做 endpoint/credential handle、network/TLS/redaction/operator-window 前置 review，不读取 credential value、不解析 raw endpoint URL、不发真实 HTTP 请求。
Java v104 + mini-kv v113 已推荐并行完成：Java 只读回显 Node v258 handle review，mini-kv 只读证明 non-participation / no-start / no-write / no-credential / no-raw-endpoint。
Node v259 已完成 sandbox endpoint handle upstream echo verification：消费 Node v258 + Java v104 + mini-kv v113，验证 endpoint handle、credential handle、policy review、operator window 和 no-side-effect 边界一致；真实 managed audit connection 仍未打开。
Node v260 已完成 sandbox endpoint credential resolver decision record：只记录 credential handle / resolver policy handle / approval marker / operator identity / approval correlation / redaction / fallback rotation plan，不读取 credential value、不解析 raw endpoint URL、不打开真实外部连接。
Java v105 + mini-kv v114 已推荐并行完成：Java 只读回显 Node v260 credential resolver decision record，mini-kv 只读证明 credential resolver non-participation。
Node v261 已完成 credential resolver upstream echo verification：消费 Node v260、Java v105、mini-kv v114，验证 resolver policy、approval marker、operator identity/correlation、decision fields、no-go conditions 和 no-side-effect 边界一致；真实 managed audit connection 仍未打开。
Node v262 已完成 disabled credential resolver precheck：消费 Node v261，定义 6 个 env handles、2 个 opt-in gates、7 个 failure classes、12 个 dry-run response fields；不实例化 resolver client / secret provider，不读取 credential value、不解析 raw endpoint URL、不发真实 external request。
Java v106 + mini-kv v115 已推荐并行完成：Java 只读回显 Node v262 disabled precheck，mini-kv 只读证明 disabled resolver precheck non-participation。
Node v263 已完成 disabled resolver precheck upstream echo verification：消费 Node v262、Java v106、mini-kv v115，验证 env handles、opt-in gates、failure taxonomy、dry-run response shape、inherited no-go conditions 和 no-side-effect 边界一致；并补齐 Java v106 / mini-kv v115 committed historical fallback。
Node v264 已完成 credential resolver test-only shell contract：消费 Node v263，定义 fake in-memory resolver shell 的 handle-only request、fake-only response、failure mapping、guard conditions 和 no-side-effect probe；仍不得读取 credential value、解析 raw endpoint URL、实例化真实 secret provider 或打开真实 managed audit connection。
Java v107 + mini-kv v116 已推荐并行完成。
Node v265 已完成 test-only resolver shell upstream echo verification。
Node v266 已完成 credential resolver fake-shell archive verification，并收口 v263 衍生计划。
Java v110 + mini-kv v117 已推荐并行完成，只读回显 Node v266 归档证据。
Node v268 已完成 credential resolver production readiness decision gate，并明确 readinessDecision=blocked。
Java v111 + mini-kv v118 已推荐并行完成，只读回显 Node v268 blocked decision。
Node v269 已完成 blocked-decision upstream echo verification，三方 blocked decision、counts、missing requirements 和 no-side-effect 边界对齐。
Node v270 已完成 credential resolver pre-implementation plan intake，把 v268 的 10 个 missing requirement 转成 10 个 defined-for-review boundary；真实 resolver、credential value、raw endpoint、managed audit connection、schema migration、ledger write 和 auto-start 仍全部关闭。
Node v271 已完成 statusRoutes split quality pass，抽出 status route types、JSON/Markdown helper 和 upstream fixture route module，迁移 10 条只读 upstream fixture / production evidence intake 路由，API path / response shape 保持不变。
Java v112 + mini-kv v119 已推荐并行完成，只读回显 Node v270 plan intake。
Node v272 已完成 pre-implementation plan intake upstream echo verification，三方 planIntakeState、counts、boundary codes、requirement codes 和 no-side-effect 边界对齐。
Node v273 已完成 credential resolver disabled implementation candidate review，10 个 boundary 分类为 4 个 disabled-candidate-ready 和 6 个 approval-required。
Java v113 + mini-kv v120 已推荐并行完成，只读回显 Node v273 disabled candidate review。
Java v114 已自发完成 verification hint catalog split，作为质量上下文记录，不作为 Node 硬前置。
Node v274 已完成 disabled candidate upstream echo verification，三方 counts、boundary scopes、interface shape、fake wiring 和 no-side-effect 边界对齐。
当前唯一有效全局计划已迁移到新同级目录：`docs/plans2/v274-post-disabled-candidate-echo-roadmap.md`。
Java v115 + mini-kv v121 已推荐并行完成；Node v275 已完成 approval-required boundary upstream echo verification。
Node v320 已完成 endpoint-handle allowlist approval contract intake；Java v147 + mini-kv v140 已完成并行只读证据，Java v148 已完成质量优化，Node v321 已完成 endpoint-handle allowlist contract upstream echo verification。
当前推进：Node v322 post-endpoint-handle prerequisite closure review，仍不解析 raw endpoint URL、不打开 managed audit connection。

不要按旧计划推进：
v223-post-external-adapter-readiness-roadmap.md 已收口，只是历史计划。
v225-post-sandbox-package-roadmap.md 已收口，只是历史计划。
v227-post-evidence-checklist-roadmap.md 已收口，只是历史计划。
v229-post-packet-verification-roadmap.md 已收口，只是历史计划。
v231-post-preflight-verification-roadmap.md 已收口，只是历史计划。
v234-post-blocked-execution-rehearsal-roadmap.md 已收口，只是历史计划。
v235-post-precondition-intake-roadmap.md 已收口，只是历史计划。
v236-post-dry-run-envelope-roadmap.md 已收口，只是历史计划。
v237-post-readiness-gate-roadmap.md 已收口，只是历史计划。
v242-post-historical-evidence-fallback-roadmap.md 已收口，只是历史计划。
v245-post-sandbox-precheck-roadmap.md 已收口，只是历史计划。
v252-post-disabled-adapter-client-precheck-roadmap.md 已收口，只是历史计划。
v263-post-disabled-resolver-echo-roadmap.md 已收口，只是历史计划。
```

## 当前硬性质量验收门槛

```text
Java v86 必须项：
- 不允许继续把新 receipt 堆进 OpsEvidenceService。
- 必须沿用 builder / helper / 子 service 拆分方式。
- 不允许新增长布尔参数构造链；字段增多时按 sandbox window / credential boundary / schema rehearsal / rollback path 分组。
- v86 只做只读 connection rehearsal readiness receipt，不写 ledger、不执行 SQL、不读取 credential value。

mini-kv v95 必须项：
- 不允许继续膨胀 command.cpp 主 if-chain。
- sandbox connection non-storage receipt 必须复用已拆出的 formatter/helper。
- 不允许触碰 WAL / snapshot / restore 核心，不允许把 mini-kv 接成 sandbox audit storage backend。
- 不允许读取 credential，不允许写 managed audit state。

Node v226 已完成项：
- 已继续使用 registerAuditJsonMarkdownRoute，没有新增手写 JSON/Markdown 路由样板。
- 已输出机器可读 operatorInputs / checklist / forbiddenOperations / pauseConditions / failureTaxonomy。
- 未读取 credential value，未连接 managed audit，未执行 SQL / ledger / mini-kv 写操作。

Java v88 / mini-kv v97 前置项：
- Java v88 只做 preflight echo marker，不写 ledger、不执行 SQL。
- mini-kv v97 只做 no-start guard receipt，不成为 audit storage backend、不读 credential、不写 managed audit state。
- 两边未完成时，Node v231 必须停止。

Node v232 / Java v89 / mini-kv v98 当前质量优化项：
- Node v232 已处理 ReadOnlyDryRunGuards / SandboxDryRunGuards 类型聚合，契约输出字段保持不变。
- Java v89 优先处理 ContextHeaderField record 组合，降低 value/source 成对字段构造噪声。
- mini-kv v98 优先处理 execute-with-wal helper，收敛 WAL / no-WAL 重复分支，行为保持不变。

Node v233 当前完成项：
- 已新增 managed audit manual sandbox connection rehearsal packet review。
- 已只读消费 Node v232 guard 类型聚合、Java v89 ContextHeaderField、mini-kv v98 execute_with_wal 证据。
- 仍保持 readyForManagedAuditSandboxAdapterConnection=false、connectsManagedAudit=false、readsManagedAuditCredential=false、schemaMigrationExecuted=false、automaticUpstreamStart=false。

Node v234 当前完成项：
- 已新增 managed audit manual sandbox connection blocked execution rehearsal。
- 已消费 Node v233 + Java v90 + mini-kv v99，模拟 8 类危险动作并全部阻断。
- actualExecutionAttemptCount=0；未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。
- 已将 v223-v234 旧沙箱链路改为滚动读取 mini-kv current runtime fixture v99，同时保留历史 consumed digest / receipt 检查。

Node v235 当前完成项：
- 已新增 managed audit manual sandbox connection precondition intake。
- 已消费 Node v234 + Java v91 + mini-kv v100，确认 6 类真实 sandbox connection 前置条件齐备。
- handlesOnly=true；未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。
- 已将 v223-v235 旧沙箱链路继续扩展到 mini-kv current runtime fixture v100，同时保留历史 consumed digest / receipt 检查。

Node v236 当前完成项：
- 已新增 managed audit manual sandbox connection dry-run request envelope。
- 已消费 Node v235 intake，生成 6 个 operatorReviewFields。
- credentialHandleOnly=true、credentialValueIncluded=false、actualConnectionAttempted=false。
- 未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。

Node v237 当前完成项：
- 已新增 managed audit manual sandbox connection readiness gate。
- 已消费 Node v236 dry-run envelope、Java v92 echo receipt、mini-kv v101 no-start/no-write follow-up。
- readyForOperatorWindowChecklist=true，但 readyForManagedAuditSandboxAdapterConnection=false。
- 已区分 source material readiness 与当前 UPSTREAM_ACTIONS_ENABLED runtime blocker。
- 未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。

Node v238 当前完成项：
- 已新增 managed audit manual sandbox connection operator window checklist。
- 已消费 Node v237 readiness gate，生成 3 个 approvalItems、8 个 checklistSteps、8 个 pauseConditions、6 个 forbiddenOperations。
- readyForJavaV93EchoReceipt=true，但 readyForManagedAuditSandboxAdapterConnection=false。
- 未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。

Node v239 当前完成项：
- 已新增 managed audit manual sandbox connection operator window evidence verification。
- 已消费 Node v238 operator window checklist、Java v93 echo receipt、mini-kv v102 no-start/no-write receipt。
- javaEchoAccepted=true、miniKvReceiptAccepted=true、checklistCountsAligned=true、boundaryFlagsAligned=true。
- Java v94 / mini-kv v103 只作为优化 follow-up 记录，不升格为 v239 新依赖。
- 未连接 managed audit，未读取 credential value，未执行 schema migration，未启动 Java / mini-kv。

Node v240 当前完成项：
- 已新增 managed audit route registration table quality pass。
- 已把 auditRoutes.ts 中 40+ 个 JSON/Markdown route 注册拆到 `src/routes/auditJsonMarkdownRoutes.ts`。
- 已把共享注册器拆到 `src/routes/auditJsonMarkdownRouteRegistrar.ts`，共享依赖类型拆到 `src/routes/auditRouteTypes.ts`。
- auditRoutes.ts 从 457 行降到 29 行；API path / response shape 保持不变。
- 只做 Node 质量优化，不新增 Java / mini-kv 业务 evidence 依赖，不打开 managed audit connection。
```

规则：

- Node 每个版本或每几个版本，视工作量输出一份计划文档
- 计划文档统一放在 `docs/plans/`
- 文件名建议带来源版本和主题，例如 `v52-cross-project-roadmap.md`
- 如果计划由某个版本衍生，文档开头必须说明来源版本
- 如果计划影响 Java 或 mini-kv，需要明确写出跨项目边界、暂停条件和不做事项
- 分工规则：Codex 默认只负责推进 Node 项目 `D:\nodeproj\orderops-node`；Java 和 mini-kv 只做只读核对、计划判断和方向提示，不直接修改、不构建、不启动、不测试，除非用户明确重新授权交叉开发
- 如果最新计划的下一步是 Java 或 mini-kv 版本，收到“推进”时必须先做只读完成度核对，再决定是否停止或继续 Node
- 跨项目只读完成度核对步骤：检查对应项目 `git status` 是否干净、`git log` / tag 是否出现计划版本、计划要求的 sample/fixture/文档文件是否存在、关键字段是否匹配计划；不得构建、启动、测试或修改 Java / mini-kv
- 如果只读核对确认 Java / mini-kv 计划版本已完成，则继续推进下一个 Node 版本；如果未完成或证据不足，则说明缺少哪项证据并停止
- 每次推进 Node 自己的新版本前，必须先读取 `docs/plans/` 中最新计划文档，并按最新计划的版本范围、验证要求、截图规则、暂停条件执行
- 计划粒度要按真实开发效率组织：能够安全并行、互不阻塞、且同属一个交付闭环的 Node / Java / mini-kv 版本，应写成“同轮推荐并行”或“推荐并行”，不要拆成让人误解为必须串行的多个步骤
- 运行调试截图默认优先使用本机 Chrome / Chromium 可执行文件；不要默认触发 Playwright 浏览器下载。若当前机器未找到 Chrome / Chromium，可使用本机 Edge 兜底，并在归档说明中写明。
- 同一条未完成开发主线不要创建互相重合的多个计划文件；当当前计划覆盖的版本做完后，下一阶段另起新的计划文件，并只在旧计划记录收口状态
- v107 起运行调试截图和解释默认放在 `b/<版本>/图片` 与 `b/<版本>/解释`；v161 起切换到 `c/<版本>/图片` 与 `c/<版本>/解释`；`a/` 和 `b/` 保留历史归档
- v104 起代码讲解写入 `代码讲解记录_生产雏形阶段/`；旧目录 `代码讲解记录/` 保留 v1-v103 历史记录

## 当前计划

```text
v52-cross-project-roadmap.md
 -> 由 Node v52 upstream overview 衍生出的三项目综合开发路线图；当前收敛为 Java v36、Node v53、mini-kv v44、mini-kv v45、Node v54 五个近期版本，并标明可一起推进的批次

v54-post-infojson-roadmap.md
 -> 由 Node v54 mini-kv INFOJSON 接入衍生出的后续计划；收敛为 Java v37、mini-kv v46、Node v55、Node v56，并新增运行调试截图归档规则

v56-post-dashboard-control-roadmap.md
 -> 由 Node v56 Dashboard 上游观察详情面板衍生出的受控操作预演计划；收敛为 Java v38、mini-kv v47、Node v57、Node v58、Node v59，并说明哪些版本可以一起推进

v59-post-preflight-control-roadmap.md
 -> 由 Node v59 operation preflight evidence bundle 衍生出的后续计划；已推进到 Node v65 接入 Java v40 approval-status 与 mini-kv v49 side_effects

v65-post-upstream-evidence-roadmap.md
 -> 由 Node v65 upstream evidence integration 衍生出的后续计划；收敛为 Node v66、Java v41 + mini-kv v50、Node v67、Node v68，并继续保持真实执行前 gate 边界

v68-post-execution-gate-roadmap.md
 -> 由 Node v68 execution gate preview 衍生出的执行前证据链计划；已推进到 Node v71 接入 Java v42 与 mini-kv v51 execution-contract 证据

v71-post-execution-contract-roadmap.md
 -> 由 Node v71 execution-contract evidence 衍生出的当前主线计划；已完成 Node v72-v75 并收口

v75-post-fixture-diagnostics-roadmap.md
 -> 由 Node v75 fixture drift diagnostics 衍生出的下一阶段计划；已完成 Node v76-v78 并收口

v78-post-scenario-matrix-roadmap.md
 -> 由 Node v78 fixture scenario matrix 衍生出的下一阶段计划；已完成 Node v79-v80 并收口

v80-post-scenario-matrix-verification-roadmap.md
 -> 由 Node v80 scenario matrix verification 衍生出的下一阶段计划；已完成 Node v81-v82 并收口

v82-post-scenario-archive-bundle-roadmap.md
 -> 由 Node v82 scenario verification archive bundle 衍生出的下一阶段计划；已完成 Node v83-v84 并收口

v84-post-scenario-archive-verification-roadmap.md
 -> 由 Node v84 scenario archive bundle verification 衍生出的下一阶段计划；收敛为 Node v85、Node v86

v86-production-readiness-roadmap.md
 -> 由 Node v86 release evidence index 后续主线衍生出的生产就绪路线；已推进到 Node v89

v89-production-hardening-roadmap.md
 -> 由 Node v89 deployment safety profile 衍生出的生产硬化路线；已推进到 Node v92

v92-production-ops-roadmap.md
 -> 由 Node v92 rollback evidence runbook 衍生出的生产运维证据路线；已推进到 Node v95

v95-production-gap-roadmap.md
 -> 由 Node v95 production readiness summary index 衍生出的生产阻塞项收敛计划；已完成 Node v96-v99 并收口

v99-production-readiness-v2-roadmap.md
 -> 由 Node v99 production readiness summary v2 衍生出的生产阻塞项收敛计划；已完成 Node v100-v103 并收口

v103-production-auth-audit-roadmap.md
 -> 由 Node v103 production readiness summary v3 衍生出的生产 auth/audit 计划；已完成 Node v104-v107 并收口

v107-production-readiness-v4-roadmap.md
 -> 由 Node v107 production readiness summary v4 衍生出的生产门槛可切换演练计划；已完成 Node v108-v110 并收口

v110-production-hardening-roadmap.md
 -> 由 Node v110 production readiness summary v5 衍生出的生产认证与审计硬化计划；已完成 Node v111-v113 并收口

v113-production-integration-roadmap.md
 -> 由 Node v113 deployment environment readiness gate 衍生出的生产硬门槛集成计划；已完成 Node v114-v116 并收口

v116-production-adapter-roadmap.md
 -> 由 Node v116 production readiness summary v6 衍生出的生产 adapter 边界计划；已完成 Node v117-v119 并收口

v119-production-connection-roadmap.md
 -> 由 Node v119 production readiness summary v7 衍生出的计划；已完成 Node v120-v122 并收口

v122-production-connection-candidate-roadmap.md
 -> 由 Node v122 production readiness summary v8 衍生出的计划；已完成 Node v123-v125 并收口

v125-production-connection-readiness-roadmap.md
 -> 由 Node v125 production readiness summary v9 衍生出的计划；已完成 Node v126-v128 并收口

v128-production-connection-implementation-roadmap.md
 -> 由 Node v128 production readiness summary v10 衍生出的计划；已完成 Node v129-v131 并收口

v131-production-connection-review-roadmap.md
 -> 由 Node v131 production readiness summary v11 衍生出的计划；已完成 Node v132-v134 并收口

v134-production-live-probe-roadmap.md
 -> 由 Node v134 production readiness summary v12 衍生出的计划；已完成 Node v135-v137 并收口

v137-production-live-probe-evidence-roadmap.md
 -> 由 Node v137 production readiness summary v13 衍生出的计划；已完成 Node v138-v140 并收口，且本阶段没有新增 summary v14

v140-live-probe-handoff-roadmap.md
 -> 由 Node v140 production live probe evidence archive bundle 衍生出的计划；已完成 Node v141-v143 并收口

v143-live-probe-real-read-window-roadmap.md
 -> 由 Node v143 real-read smoke archive adapter 衍生出的计划；已完成 Node v144-v146 并由 v146-production-pass-evidence-roadmap.md 接续

v146-production-pass-evidence-roadmap.md
 -> 由 Node v146 production live probe real-read smoke release evidence gate 衍生出的计划；已完成 Node v147-v149 并由 v149-post-production-pass-evidence-roadmap.md 接续

v149-post-production-pass-evidence-roadmap.md
 -> 已完成 Node v150-v159 并由 v159-post-release-evidence-review-roadmap.md 接续

v159-post-release-evidence-review-roadmap.md
 -> 已完成 Node v160-v161 并由 v161-post-controlled-idempotency-drill-roadmap.md 接续

v161-post-controlled-idempotency-drill-roadmap.md
 -> 已完成 Java v54、mini-kv v63、Node v162、Java v55、mini-kv v64、Node v163，并由 v163-post-rollback-readiness-roadmap.md 接续

v163-post-rollback-readiness-roadmap.md
 -> 已完成并收口；Node v164-v166、Java v56-v57、mini-kv v65-v66 已完成，由 v166-post-rollback-window-roadmap.md 接续

v166-post-rollback-window-roadmap.md
 -> 已完成并收口；Java v59 + mini-kv v68 已推荐并行完成，Node v168 已消费两边 secret/digest evidence，Node v169 已完成 post-v166 readiness summary

v169-post-production-environment-preflight-roadmap.md
 -> 已完成并收口；由 Node v169 post-v166 readiness summary 衍生，Node v170 已插入 report shared helpers hardening 维护重构，Java v60 + mini-kv v69、Java v61 + mini-kv v70 均已推荐并行完成，Node v171-v173 已消费并形成 release window readiness packet；由 v173-post-release-window-readiness-roadmap.md 接续

v173-post-release-window-readiness-roadmap.md
 -> 已完成并收口；由 Node v173 release window readiness packet 衍生，Node v174 production release dry-run envelope、推荐并行 Java v62 + mini-kv v71、Node v175 release handoff readiness review、Node v176 CI evidence hardening packet 已完成，由 v176-post-ci-evidence-hardening-roadmap.md 接续

v176-post-ci-evidence-hardening-roadmap.md
 -> 已完成并收口；由 Node v176 CI evidence hardening packet 衍生，Node v177 CI operator identity evidence packet、推荐并行 Java v63 + mini-kv v72、Node v178 cross-project evidence retention gate、Node v179 production release pre-approval packet 已完成，由 v179-post-pre-approval-roadmap.md 接续

v179-post-pre-approval-roadmap.md
 -> 已完成并收口；由 Node v179 production release pre-approval packet 衍生，推荐并行 Java v64 + mini-kv v73、Node v180、Node v181、推荐并行 Java v65 + mini-kv v74、Node v182 release approval decision rehearsal packet 已完成，由 v182-post-rehearsal-quality-roadmap.md 接续

v182-post-rehearsal-quality-roadmap.md
 -> 已完成并收口；由 Node v182 release approval decision rehearsal packet 衍生，Node v183-v184 已完成 opsPromotionArchiveBundle 第一轮实际优化与边界测试，Java v66 + mini-kv v75 已推荐并行完成，Node v185 已完成 real-read rehearsal intake，由 v185-post-real-read-rehearsal-roadmap.md 接续

v185-post-real-read-rehearsal-roadmap.md
 -> 已完成并收口；由 Node v185 real-read rehearsal intake 衍生；Node v186-v190 已完成 opsPromotionArchiveBundle 技术债拆分，Java v67 + mini-kv v76 已推荐并行完成，Node v191 已完成 real HTTP/TCP read adapter rehearsal；由 v191-post-real-read-adapter-roadmap.md 接续

v191-post-real-read-adapter-roadmap.md
 -> 已完成并收口；由 Node v191 real HTTP/TCP read adapter rehearsal 衍生；Node v192、推荐并行 Java v68 + mini-kv v77、Node v193 real-read adapter failure taxonomy、Node v194 evidence archive 已完成，由 v194-post-real-read-archive-roadmap.md 接续

v194-post-real-read-archive-roadmap.md
 -> 已完成并收口；由 Node v194 real-read adapter evidence archive 衍生；Node v195 archive verification、推荐并行 Java v69 + mini-kv v78、Node v196 imported window result packet、Node v197 production readiness checkpoint 已完成，由 v197-post-readiness-checkpoint-roadmap.md 接续

v197-post-readiness-checkpoint-roadmap.md
 -> 已完成并收口；由 Node v197 production readiness checkpoint 衍生；Node v198 real-read window operator identity binding、推荐并行 Java v70 + mini-kv v79、Node v199 real-read window audit store handoff contract、Node v200 CI archive artifact manifest 已完成；由 v200-post-ci-artifact-manifest-roadmap.md 接续

v200-post-ci-artifact-manifest-roadmap.md
 -> 已完成并收口；由 Node v200 real-read window CI archive artifact manifest 衍生；推荐并行 Java v71 + mini-kv v80、Node v201、Node v202、推荐并行 Java v72 + mini-kv v81、Node v203 cross-project CI artifact retention gate 已完成；由 v203-post-ci-artifact-retention-roadmap.md 接续

v203-post-ci-artifact-retention-roadmap.md
 -> 已完成并收口；由 Node v203 cross-project CI artifact retention gate 衍生；Node v204 联调预检、推荐并行 Java v73 + mini-kv v82、Node v205 真实只读联调 execution packet、Node v206 archive verification 已完成；由 v206-post-real-read-archive-verification-roadmap.md 接续

v206-post-real-read-archive-verification-roadmap.md
 -> 已完成并收口；由 Node v206 three-project real-read runtime smoke archive verification 衍生；Node v207 post-real-read production hardening triage 已完成，由 v207-post-hardening-triage-roadmap.md 接续

v207-post-hardening-triage-roadmap.md
 -> 已完成并收口；由 Node v207 post-real-read production hardening triage 衍生；Java v74 + mini-kv v83 已推荐并行完成，Node v208 managed audit persistence boundary candidate 已完成，由 v208-managed-audit-boundary-roadmap.md 接续

v208-managed-audit-boundary-roadmap.md
 -> 已完成并收口；由 Node v208 managed audit persistence boundary candidate 衍生；Node v209 managed audit persistence dry-run verification 已完成，只写 Node 本地测试临时目录，不写 Java 或 mini-kv；由 v209-managed-audit-dry-run-roadmap.md 接续

v209-managed-audit-dry-run-roadmap.md
 -> 已完成并收口；由 Node v209 managed audit persistence dry-run verification 衍生；Node v210、推荐并行 Java v75 + mini-kv v84、Node v211 managed audit identity approval provenance dry-run packet 已完成；由 v211-post-managed-audit-packet-roadmap.md 接续

v211-post-managed-audit-packet-roadmap.md
 -> 已完成并收口；由 Node v211 managed audit identity approval provenance dry-run packet 衍生；Node v212 packet verification report、推荐并行 Java v76 + mini-kv v85 只读消费回执、Node v213 managed audit packet restore drill plan 已完成，下一阶段应另起新计划

v213-post-restore-drill-plan-roadmap.md
 -> 已完成并收口；由 Node v213 managed audit packet restore drill plan 衍生；Node v214 archive verification、推荐并行 Java v77 + mini-kv v86、Node v215 managed audit dry-run adapter candidate 已完成，下一阶段应另起 post-v215 计划

v215-post-dry-run-adapter-roadmap.md
 -> 已完成并收口；由 Node v215 managed audit dry-run adapter candidate 衍生；Node v216 archive verification、推荐并行 Java v78 + mini-kv v87、Node v217 production-hardening readiness gate 已完成，由 v217-post-production-hardening-gate-roadmap.md 接续

v217-post-production-hardening-gate-roadmap.md
 -> 已完成并收口；由 Node v217 managed audit adapter production-hardening readiness gate 衍生；Node v218、推荐并行 Java v79 + mini-kv v88、Node v219 implementation precheck packet 已完成，由 v219-post-implementation-precheck-roadmap.md 接续

v219-post-implementation-precheck-roadmap.md
 -> 已完成并收口；由 Node v219 managed audit adapter implementation precheck packet 衍生；Node v220、推荐并行 Java v80 + mini-kv v89、Node v221 本地 adapter candidate dry-run 已完成；由 v221-post-local-adapter-candidate-roadmap.md 接续

v221-post-local-adapter-candidate-roadmap.md
 -> 已完成并收口；由 Node v221 managed audit local adapter candidate dry-run 衍生；Node v222 local adapter candidate verification report、推荐并行 Java v81 + mini-kv v90、Node v223 external adapter connection readiness review 已完成；由 v223-post-external-adapter-readiness-roadmap.md 接续

v223-post-external-adapter-readiness-roadmap.md
 -> 已完成并收口；由 Node v223 managed audit external adapter connection readiness review 衍生；Node v224、推荐并行 Java v82 + mini-kv v91、Node v225 sandbox adapter dry-run package 已完成；由 v225-post-sandbox-package-roadmap.md 接续

v225-post-sandbox-package-roadmap.md
 -> 已完成并收口；由 Node v225 managed audit sandbox adapter dry-run package 衍生；Node v226、推荐并行 Java v86 + mini-kv v95、Node v227 manual sandbox connection evidence checklist 已完成；由 v227-post-evidence-checklist-roadmap.md 接续

v227-post-evidence-checklist-roadmap.md
 -> 已完成并收口；由 Node v227 manual sandbox connection evidence checklist 衍生；Node v228、推荐并行 Java v87 + mini-kv v96、Node v229 packet verification 已完成；由 v229-post-packet-verification-roadmap.md 接续

v229-post-packet-verification-roadmap.md
 -> 已完成并收口；由 Node v229 manual sandbox connection packet verification 衍生；Node v230、推荐并行 Java v88 + mini-kv v97、Node v231 preflight verification 已完成；由 v231-post-preflight-verification-roadmap.md 接续

v231-post-preflight-verification-roadmap.md
 -> 已完成并收口；由 Node v231 manual sandbox connection preflight verification 衍生；Node v232、Java v89 + mini-kv v98、Node v233 已完成，并由 v234-post-blocked-execution-rehearsal-roadmap.md 接续

v234-post-blocked-execution-rehearsal-roadmap.md
 -> 已完成并收口；由 Node v234 blocked execution rehearsal 衍生；Java v91 + mini-kv v100、Node v235 precondition intake 已完成，并由 v235-post-precondition-intake-roadmap.md 接续

v235-post-precondition-intake-roadmap.md
 -> 已完成并收口；由 Node v235 precondition intake 衍生；Node v236 dry-run request envelope 已完成，并由 v236-post-dry-run-envelope-roadmap.md 接续

v236-post-dry-run-envelope-roadmap.md
 -> 已完成并收口；由 Node v236 dry-run request envelope 衍生；Java v92 + mini-kv v101 已推荐并行完成，Node v237 readiness gate 已完成，并由 v237-post-readiness-gate-roadmap.md 接续

v237-post-readiness-gate-roadmap.md
 -> 已完成并收口；由 Node v237 readiness gate 衍生；Node v238 operator window checklist、推荐并行 Java v93 + mini-kv v102、Node v239 operator window evidence verification、Node v240 route registration table quality pass、推荐并行 Java v94-v97 + mini-kv v103-v106、Node v241 dry-run command package、Node v242 historical evidence fallback 已完成；由 v242-post-historical-evidence-fallback-roadmap.md 接续

v242-post-historical-evidence-fallback-roadmap.md
 -> 已完成并收口；由 Node v242 historical evidence fallback 衍生；Node v243 command package verification report、Java v98 + mini-kv v107、Node v244 upstream echo verification、Node v245 sandbox connection precheck packet 已完成；由 v245-post-sandbox-precheck-roadmap.md 接续

v245-post-sandbox-precheck-roadmap.md
 -> 已完成并收口；由 Node v245 sandbox connection precheck packet 衍生；Node v246-v252 已完成，由 v252-post-disabled-adapter-client-precheck-roadmap.md 接续

v252-post-disabled-adapter-client-precheck-roadmap.md
 -> 已完成并收口；由 Node v252 disabled adapter client precheck 衍生；Node v253、推荐并行 Java v102 + mini-kv v111、Node v254 三方验证、Node v255 fake transport dry-run packet 已完成，由 v255-post-fake-transport-dry-run-roadmap.md 接续

v255-post-fake-transport-dry-run-roadmap.md
 -> 已完成并收口；由 Node v255 fake transport adapter dry-run verification packet 衍生；Node v256、推荐并行 Java v103 + mini-kv v112、Node v257 fake transport packet upstream echo verification 均已完成，下一阶段应另起 post-v257 计划

v257-post-fake-transport-upstream-echo-roadmap.md
 -> 已完成并收口；由 Node v257 fake transport packet upstream echo verification 衍生；Node v258、推荐并行 Java v104 + mini-kv v113、Node v259、Node v260 已完成；由 v260-post-credential-resolver-decision-roadmap.md 接续

v260-post-credential-resolver-decision-roadmap.md
 -> 已完成并收口；由 Node v260 sandbox endpoint credential resolver decision record 衍生；Java v105 + mini-kv v114、Node v261、Node v262、Java v106 + mini-kv v115、Node v263 均已完成，由 v263-post-disabled-resolver-echo-roadmap.md 接续

v263-post-disabled-resolver-echo-roadmap.md
 -> 已完成并收口；由 Node v263 disabled resolver precheck upstream echo verification 衍生；Node v264 credential resolver test-only shell contract、推荐并行 Java v107 + mini-kv v116、Java v108/v109 优化上下文、Node v265 test-only resolver shell upstream echo verification、Node v266 archive verification 已完成；由 v266-post-fake-shell-archive-roadmap.md 接续

v266-post-fake-shell-archive-roadmap.md
 -> 已完成并收口；由 Node v266 credential resolver fake-shell archive verification 衍生；Java v110 + mini-kv v117、Node v268、Java v111 + mini-kv v118、Node v269 已完成，由 v269-post-blocked-decision-upstream-echo-roadmap.md 接续

v269-post-blocked-decision-upstream-echo-roadmap.md
 -> 已完成并收口；Node v270 plan intake、Node v271 quality pass、推荐并行 Java v112 + mini-kv v119、Node v272 upstream echo verification 已完成，由 v272-post-plan-intake-echo-roadmap.md 接续

v272-post-plan-intake-echo-roadmap.md
 -> 已完成并收口；由 Node v272 plan-intake upstream echo verification 衍生；Node v273 disabled implementation candidate review、推荐并行 Java v113 + mini-kv v120、Node v274 disabled candidate upstream echo verification 均已完成；由 v274-post-disabled-candidate-echo-roadmap.md 接续

v274-post-disabled-candidate-echo-roadmap.md
 -> 当前唯一有效全局计划；由 Node v274 disabled candidate upstream echo verification 衍生；下一步推荐并行 Java v115 + mini-kv v121，随后 Node v275 消费两侧 approval-required boundary 证据
```

## v269 计划接续状态

```text
Java v111 + mini-kv v118 已推荐并行完成，只读回显 Node v268 blocked decision。
Node v269 已完成 blocked-decision upstream echo verification，三方 blocked decision、counts、missing requirements 和 no-side-effect 边界对齐。
Node v270 已完成 credential resolver pre-implementation plan intake，把 10 个真实 resolver 前置边界写成可审查计划。
Node v271 已完成 statusRoutes 第一刀质量拆分，迁移 10 条 upstream fixture route，保持 API path / response shape 不变。
Java v112 + mini-kv v119 已完成，只读回显 Node v270。
Node v272 已完成 pre-implementation intake upstream echo verification，三方 plan-intake 证据已对齐。
Node v273 已完成 disabled implementation candidate review，10 个边界被分类为 4 个 disabled-candidate-ready 和 6 个 approval-required；真实 resolver / credential value / raw endpoint / managed audit connection 仍关闭。
Java v113 + mini-kv v120 已完成，只读回显 Node v273。
Java v114 已完成 verification hint catalog split，作为质量上下文记录。
Node v274 已完成 disabled candidate upstream echo verification，三方 candidate counts、boundary scopes、interface shape、fake wiring 和 no-side-effect 边界已对齐。
当前唯一有效全局计划：docs/plans/v274-post-disabled-candidate-echo-roadmap.md
下一步：推荐并行 Java v115 + mini-kv v121；Node v275 必须等两边完成后再做 approval-required boundary 上游回显验证。
```
