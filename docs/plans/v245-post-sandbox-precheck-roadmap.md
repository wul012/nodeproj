# Node v245 衍生计划：sandbox connection precheck 后续阶段

来源版本：Node v245 `sandbox connection precheck packet`。

计划状态：已完成并收口。上一份 `docs/plans/v242-post-historical-evidence-fallback-roadmap.md` 已完成 Node v243、推荐并行 Java v98 + mini-kv v107、Node v244、Node v245，并已收口；本计划已完成 Node v246-v252，后续由 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md` 接续，不再向本计划追加重合版本。

## 当前对齐状态

```text
Node v245：
- sandbox connection precheck packet 已完成
- owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy 已生成
- readyForManagedAuditSandboxAdapterConnection=false
- 不读取 credential value，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv

Node v246：
- GitHub CI historical sibling evidence fallback repair 已完成
- 旧 managed-audit sandbox 链路不再依赖开发机 `D:/javaproj` 与 `D:/C/mini-kv` 文件存在
- committed sibling evidence fixture 精确收录被 Node 读取的 Java / mini-kv 历史证据，不全量搬运上游仓库
- `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 可在本机模拟 GitHub runner
- 业务能力不前进，不打开 managed audit connection，不启动、不修改 Java / mini-kv

Java v99 + mini-kv v108：
- 两边已完成并只读核对通过
- Java v99 已提供 Node v245 precheck packet echo receipt，回显 7 个 precheck item、timeout、字段边界与 Java no-write/no-connection/no-credential 语义
- mini-kv v108 已提供 manual sandbox precheck non-participation receipt，证明不 auto-start、不写 storage、不读 credential、不执行 restore/load/compact/SETNXEX、不成为 managed audit storage backend

Node v247：
- manual sandbox connection precheck upstream receipt verification 已完成
- 只读消费 Node v245 + Java v99 + mini-kv v108
- 已验证 precheck item count、operator field count/name、timeout policy、credential/connection/write/auto-start 边界一致
- 由于 v246 被插入用于 GitHub CI fallback repair，Java v99 / mini-kv v108 中写给 Node v246 的 consumer hint 被 v247 明确接受为同一 precheck verification slot
- 仍不读取 credential value，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv

Node v252：
- disabled adapter client precheck 已完成
- 已定义 required env handles、opt-in gate、failure taxonomy、dry-run response shape 和复用 v251 no-go 条件
- adapter client 仍是 not-implemented，clientMayBeInstantiated=false，externalRequestMayBeSent=false，credentialValueMayBeLoaded=false
- 仍不读取 credential value，不发真实外部请求，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv
```

## 推荐执行顺序

```text
1. Node v246：GitHub CI historical sibling evidence fallback repair。已完成。
   - 修复 v225-v245 旧 managed-audit sandbox 链路在 GitHub Actions 上找不到 `D:/javaproj` 与 `D:/C/mini-kv` 历史证据导致 blocked 的问题。
   - 只把 Node 实际读取的 Java / mini-kv evidence 文件归档到 `fixtures/historical/sibling-workspaces/`，不全量复制上游项目。
   - 增加 forced fallback 验证开关，确保本机也能模拟 CI 无 sibling workspace 的环境。
   - 这是 CI 稳定性修复，不替代 Java v99 + mini-kv v108，也不推进真实连接。

2. 推荐并行：Java v99 + mini-kv v108。已完成。
   - Java v99：manual sandbox connection precheck packet echo receipt，只读回显 Node v245 的 owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy；不写 ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v108：manual sandbox connection precheck non-participation receipt，只读证明 Node v245 precheck packet 不会让 mini-kv 自动启动、写 storage、读 credential、执行 restore/load/compact/SETNXEX，且不会成为 managed audit storage backend。
   - 两者可以并行推进，因为它们只读消费 Node v245 packet，不互相依赖，也不做真实连接。

3. Node v247：manual sandbox connection precheck upstream receipt verification。已完成。
   只读消费 Java v99 + mini-kv v108，验证 precheck item count、operator field names、credential/connection/write/auto-start 边界一致。
   如果两边未完成或证据不匹配，Node v247 必须停止，不得降级为部分 ready。
   本版已额外把 Java v99 / mini-kv v108 的六个 v247 所需证据复制到 `fixtures/historical/sibling-workspaces/`，确保 GitHub runner 没有 sibling workspace 时仍可验证。

4. 推荐并行质量优化批次：Node v248 + Java v100 + mini-kv v109。当前批次，先优化再继续 rehearsal guard。
   - Node v248：managed-audit sandbox code health pass。已完成。先不推进真实连接，优先处理 Node 自身债务：为 v247 service 增加边界/回归测试、减少新增大 service 后的维护风险，并建立下一步拆 `statusRoutes.ts` / `dashboard.ts` / `opsPromotionArchiveRenderers.ts` 的验收清单。
   - Java v100：CI bootstrap + large-file guard。补 `.github/workflows` Maven compile/test 基线，并把 `ReleaseApprovalRehearsalResponse.java` / `OpsEvidenceService.java` 的后续拆分目标写入 Java 自己的版本归档；不改业务语义、不写 ledger、不执行 SQL。
   - mini-kv v109：CI/benchmark evidence guard。保持当前单机 KV 语义，只增强 CI/benchmark/evidence 可读性或轻量测试；不触碰 WAL/snapshot/restore 核心，不引入分片、复制或 managed audit storage backend。
   - 这三项可以并行推进：Node 只改控制面质量与测试，Java 只补 CI 和拆分计划，mini-kv 只补低风险质量证据，彼此不互相阻塞，也都不打开真实 managed audit connection。

5. 推荐并行安全维护批次：Node v249 + Java v101 + mini-kv v110。已完成，先补自动依赖维护，再做三项目对齐。
   - Node v249：Dependabot/security maintenance。已完成。新增 `.github/dependabot.yml`，覆盖 npm 和 GitHub Actions；周更、分组 minor/patch、忽略 semver-major 自动升级，并让 Node Evidence workflow 监听 dependabot 配置变化。
   - Java v101：Dependabot/security maintenance。已完成。覆盖 Maven 与 GitHub Actions；配置位于 Java git 根 `D:\javaproj\.github\dependabot.yml`，Maven directory 指向 `/advanced-order-platform`；不改 release approval 业务语义。
   - mini-kv v110：Dependabot/security maintenance。已完成。覆盖 GitHub Actions，并用 CTest 守住不引入 npm/Maven/pip/cargo/Docker 等生态；不改 WAL/snapshot/restore 核心。
   - 这三项可以并行推进：都是仓库安全维护配置，不互相依赖，也不打开真实 managed audit connection。

6. Node v250：manual sandbox connection rehearsal guard / three-project alignment。已完成。
   - 消费 Node v247 precheck upstream receipt verification、Node v248 code health pass、Node v249 Dependabot、安全维护配置、Java v101 Maven/GitHub Actions Dependabot、mini-kv v110 GitHub Actions Dependabot。
   - 明确需要 owner approval artifact、credential handle review status、schema rehearsal approval、manual window open marker、rollback path、abort marker 与 timeout policy。
   - 修正 Node historicalEvidenceResolver 的 Java root-level `.github` fallback，避免 CI 无 sibling workspace 时读不到 `D:\javaproj\.github` 证据。
   - 仍不读取 credential value，不连接 managed audit，不执行 schema migration，不启动 Java / mini-kv。

7. Node v251：manual sandbox connection decision record。已完成。
   - 在 v250 guard ready 后，生成一份人工连接决策记录：记录 owner、credential handle review status、schema rehearsal id、manual window id、rollback path、abort marker、timeout policy、security maintenance digest 和 explicit no-go 条件。
   - 仍不打开真实 managed audit connection，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv。
   - 已列出八个 no-go 条件：credential value、schema migration、upstream auto-start、approval ledger write、mini-kv storage backend、owner artifact missing、rollback/abort missing、timeout missing，任一触发都必须 pause-and-do-not-connect。

8. Node v252：disabled adapter client precheck。已完成，本计划收口。
   - 在 v251 decision record ready 后，只定义 disabled adapter client 的边界：required env handles、failure taxonomy、opt-in gate、dry-run response shape 和 no-go 条件复用。
   - 仍不读取 credential value，不发真实外部请求，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv。
   - 如果 v252 需要真实 credential、生产 IdP、生产数据库、真实 external endpoint 或自动启动上游，必须暂停。
   - 后续版本进入 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md`，不再继续往本计划追加。
```

## 显式质量优化项

```text
Node：
- v246 是 CI fallback repair，不新增路由、不推进业务连接能力。
- v247 已继续使用 `registerAuditJsonMarkdownRoute` 路由注册表。
- v247 已只读核对 Java / mini-kv 的 tag、归档、fixture、关键字段；没有构建、启动、测试、修改上游项目。
- v247 已补 committed sibling evidence fallback，避免 GitHub runner 因缺少 `D:/javaproj` 或 `D:/C/mini-kv` 而 blocked。
- v248 已改为质量优化版，新增 managed-audit sandbox code health pass，自动核对 v247 fallback / blocked config / JSON-Markdown route 回归测试、route table 注册和无真实连接 client。
- Node 大文件当前只读观察已固化进 v248 profile：`statusRoutes.ts`、`dashboard.ts`、`opsPromotionArchiveRenderers.ts`、v247 service。v248 不拆大文件，但给出 Node v250+ / v251+ / v252+ 的拆分验收清单，并避免再新增同类 1000+ 行 service。
- v249 做 Dependabot/security maintenance，覆盖 npm + GitHub Actions，并用测试锁住配置与 CI workflow path 触发。
- v249 不升级任何依赖版本，不改变 runtime 行为，不新增 managed audit connection client。
- v250 已完成 manual sandbox connection rehearsal guard，继续使用 `auditJsonMarkdownRoutes` route table，并只读消费 Node v247/v248/v249、Java v101、mini-kv v110 证据。
- v250 已修正 Java root-level `.github` historical fallback；这是三项目对齐必要修正，不代表 Node 可以修改 Java 仓库。
- v251 应做人工连接决策记录，不得直接跳到真实 adapter client。
- v251 已完成人工连接决策记录，明确七个决策字段和八个 no-go 条件；下一步 v252 只能做 disabled adapter client precheck，不得加入真实网络调用。
- v252 已完成 disabled adapter client precheck；下一阶段若要继续靠近真实 adapter，只能先做 fake transport / test-only shell / 上游 echo，不得直接写真实连接 client。

Java：
- v99 优先用 builder/helper 承载 precheck echo receipt，不把字段继续堆进 OpsEvidenceService 主类。
- v99 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。
- v100 优先补 GitHub Actions Maven workflow，解决 Java 是三项目中唯一无 CI 的短板。
- v100 只做 CI/质量基线，不顺手扩大 release approval 业务字段；大文件拆分可以先写 guard/plan，再按后续版本拆。
- v101 建议补 Dependabot：Maven + GitHub Actions，优先依赖自动安全提醒，不改 release approval 业务语义。
- v101 已完成；Node 读取 Java `.github` 证据时必须记住仓库根是 `D:\javaproj`，Maven 子项目是 `D:\javaproj\advanced-order-platform`。

mini-kv：
- v108 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- v108 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- v109 可做轻量 CI/benchmark/evidence guard 或补一两个低风险测试；mini-kv 已有 CI 且质量较稳，不需要为追进度做大重构。
- v109 不做分片、复制、集群、不改变 runtime authority 定位。
- v110 建议补 Dependabot：先覆盖 GitHub Actions；后续若引入 C++ 包管理器，再扩展对应生态。
- v110 已完成；Node 只读消费 `.github/dependabot.yml`、`tests/dependabot_config_tests.cpp` 和 v110 归档/讲解，不触碰 WAL/snapshot/restore 核心。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- v247 已完成；v248 先做质量优化。若 v248 或后续版本需要读取 credential value、打开 connection、执行 schema migration 或启动上游，必须暂停。
- Java v100 / mini-kv v109 与 Node v248 可以并行；但如果任一项目的优化发现会改变 precheck receipt 语义，Node v249 必须暂停重新对齐。
- Node v249 / Java v101 / mini-kv v110 只能做 Dependabot/security maintenance；如果需要升级依赖本身或修改业务代码，必须拆成后续版本。
- Node v251 只能做 manual connection decision record；如果需要真实连接 client、credential value、生产 IdP、schema migration 或自动启动上游，必须暂停。
- Node v252 只能做 disabled adapter client precheck；如果需要真实 external endpoint、credential value、生产 IdP、schema migration、approval ledger write 或自动启动上游，必须暂停。

## 一句话结论

```text
v245 已把真实 sandbox connection 前的 precheck packet 生成完；v246 修复 GitHub CI 历史证据 fallback；Java v99 + mini-kv v108 已完成只读回显/非参与；Node v247 已完成 receipt verification；Node v248 + Java v100 + mini-kv v109 质量优化批次已收口；Node v249 + Java v101 + mini-kv v110 Dependabot/security maintenance 已收口；Node v250 已完成三项目对齐与 rehearsal guard；Node v251 已完成 manual sandbox connection decision record；Node v252 已完成 disabled adapter client precheck。本计划收口，下一阶段由 v252 衍生计划接续，仍不打开真实 managed audit connection。
```
