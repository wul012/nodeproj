# v2117 Node 生产卓越 N3 边界与发布纪律代码讲解

## Goal and Non-goal / 目标与非目标

v2117 的目标是把项目后期最容易口头化、最容易遗忘的三类工程规则落成文件和测试：生产边界、版本纪律、历史 fixture 管理。这个版本没有增加业务路由，没有让 Node 更接近真实执行，也没有消费新的 Java 或 mini-kv 证据。它做的是把“现在还不能生产执行，为什么不能，哪些文件证明不能，未来要满足什么条件才可能能”写成仓库内可审阅、可测试、可引用的工程资产。

这件事在当前阶段很有必要。Node 已经有大量 readiness、rollback、deployment、audit store、release evidence profile，它们读起来越来越像生产系统，但很多字段仍然明确是 `executionAllowed: false`、`readyForProductionOperations: false`。如果没有统一边界文档，后续开发者很容易只看到“release evidence ready”这样的正向词，而忽略它只表示可以归档证据，不表示可以执行生产操作。N3 的第一项产物 `docs/PRODUCTION_BOUNDARIES.md` 就是为了解决这个歧义。

非目标同样清楚。本版不修运行时代码，不启用 production secret，不引入真实 managed-audit adapter，不把 memory audit store 说成生产存储，不改 Java 或 mini-kv 的实际仓库。历史 sibling fixtures 也不被重排、不被重命名、不被重新格式化。N3 的价值来自“明确与约束”，不是来自扩大系统能力。

这类版本在工程后期很容易被低估，因为它不像新增 endpoint 那样有直观功能，也不像拆分大文件那样能看到代码行数下降。但成熟系统真正进入生产前，很多事故都不是因为没有功能，而是因为边界含糊：一个 readiness 字段被误读，一个 fixture 被当成 live state，一个 package 版本被当成发布版本，一个 CI workflow 被认为已经拥有部署授权。v2117 选择先解决这些命名和制度问题，是为了让后续真正推进 read-only shard preview 或跨项目消费时，有一条清楚的地线。

## Entry Points / 入口

第一入口是 `docs/PRODUCTION_BOUNDARIES.md`。它把当前分类写在最前面：Node 是 read-only evidence/control-plane rehearsal，不是 production execution。然后用表格列出默认关闭项，例如 `UPSTREAM_PROBES_ENABLED`、`UPSTREAM_ACTIONS_ENABLED`、`ACCESS_GUARD_ENFORCEMENT_ENABLED`、`ORDEROPS_AUTH_TOKEN_SECRET`、`AUDIT_STORE_KIND` 和 `AUDIT_STORE_URL`。每一项都指向 `src/config.ts` 或相关服务文件，避免文档变成脱离代码的愿望清单。

第二入口是 `CHANGELOG.md`。这次选择的版本政策是：`package.json` 保持 `0.1.0`，git tag 才是当前工程里真正的 milestone version。这个选择比把 package 版本改成 `2117.0.0` 更稳，因为项目目前没有 npm 发布流程，也没有 packaging/release workflow。强行让 package 版本跟几千个内部 milestone 对齐，只会制造伪语义。文档明确写出这个政策，后续如果真的开始发布包，必须先改 CHANGELOG 里的版本政策，再动 `package.json`。

这个版本政策还有一个维护好处：它把“内部工程版本”和“外部分发版本”分开。当前 v2117、v2116、v2115 代表的是仓库治理版本，不代表 npm package 的公开 API 语义。如果将来 Node 控制面真的发布成包，package 版本应该表达兼容性和分发契约，而不是照搬内部推进次数。CHANGELOG 现在承担的是人类审阅的版本索引：每个 tag 做了什么、属于哪个治理方向、有没有改变运行边界。这个索引比单看 commit log 更稳定，因为 commit 可以拆得很细，而 changelog 只记录版本闭环。

第三入口是 `fixtures/MANIFEST.md`。Node 现在把 Java 和 mini-kv 的很多历史文件当作 fallback evidence 使用，但这些文件散在 `fixtures/historical/sibling-workspaces/` 下，数量已经不小。manifest 把 Java、mini-kv 的 root、文件数量、JSON 数量、版本跨度和主要用途记录下来，并把规则写明：这些文件是 load-bearing frozen evidence，不允许作为普通整理被移动、覆盖或格式化。以后需要新证据，就新增版本化 snapshot，而不是替换旧文件。

manifest 没有列出全部 396 个 sibling fixture 文件，是有意为之。逐文件巨表会很快变成难以维护的噪声，一旦文件数量继续增长，维护者可能为了让表格“整齐”而做机械同步，反而忽略真正重要的约束。N3 采用的是分层索引：第一层给 workspace root 和统计值，第二层给文件族和版本跨度，第三层给更新规则。真正需要逐文件追踪时，git 本身和 focused tests 会提供精确差异；manifest 负责告诉维护者哪些类别不能碰、碰了要补什么测试。

第四入口是 `test/productionExcellenceDocs.test.ts`。N3 不是只写文档，还用测试把核心语义锁住。测试检查生产边界文档必须包含“Production execution: not authorized”、`UPSTREAM_ACTIONS_ENABLED`、`executionAllowed: false`、`readyForProductionOperations: false`，检查 CHANGELOG 必须包含 `package.json` 版本政策和近期版本，检查 fixture manifest 必须包含 load-bearing、Java/mini-kv root、版本跨度和 `historicalEvidenceResolver.ts`。这让文档从“可读材料”变成 CI 守护的一部分。

测试故意没有断言完整段落，也没有检查文档顺序。文档应该允许后续维护者调整表达、扩展表格、追加新版本，而不需要每次都改大量断言。它锁的是不可丢失的事实，不是文字排版。这种测试粒度适合治理文档：太宽会变成只检查文件存在，太窄会让文档变成测试夹具。N3 选中间层，让 CI 能发现“误删生产未授权声明”“误删 package 版本政策”“误删 fixture 冻结规则”这类真实风险。

## Response Model / 响应模型

v2117 没有新增 HTTP response model，但它整理了多个既有 response 的解释边界。`productionReadinessSummaryIndex.ts` 聚合 release evidence、CI evidence、workflow evidence、deployment safety、rollback runbook 和 audit store runtime profile；这些 section 可以 ready，但 index 顶层仍然 `readyForProductionOperations: false` 且 `executionAllowed: false`。文档把这类差异写清楚，避免把“证据已满足归档条件”误读成“系统已经可以生产执行”。

`upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.ts` 的响应也是典型例子。它的 `readyForReleaseEvidenceArchive` 可以为 true，但 gate 本身是 read-only，`executionAllowed` 是 false。N3 文档把它列在“Evidence Gates That Still Block Execution”表里，说明它证明的是 fixture scenario evidence 可以归档，不证明可以调用真实上游。这个解释比单独看字段更重要，因为字段名里同时出现 ready 和 executionBlocked，很容易被不同读者拿来支持相反判断。

`auditStoreRuntimeProfile.ts` 也被纳入边界。它明确 `readyForProductionAudit: false`、`executionAllowed: false`，而 `src/config.ts` 默认 `AUDIT_STORE_KIND` 是 memory。也就是说，当前 audit store 适合 rehearsal 和 evidence capture，不是生产审计存储。N3 不改变这个模型，只把它写入生产边界文档，给后续“什么时候才算生产审计可用”留下清晰前置条件。

这里还有一个响应解释的细节：很多 profile 同时含有“ready”和“blocked”两种词。ready 往往指某个局部证据可以进入下一步，例如可以归档、可以被人工审阅、可以作为后续计划输入；blocked 指真实执行仍被禁止。N3 文档的作用就是把这些词放回上下文。后续读者看到 `readyForReleaseEvidenceArchive=true` 时，应同时看到 `executionAllowed=false`；看到 `readyForRollbackEvidenceArchive=true` 时，也应明白那不是 `rollbackExecutionAllowed=true`。这种语义分层是生产前治理系统的核心。

## Upstream Evidence and Config / 上游证据与配置

N3 对上游项目的态度是只读索引。Java historical fixture root 是 `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/`，当前统计为 222 个文件、50 个 JSON、44 个 `e/<version>/evidence/` JSON，版本跨度 v82-v274。mini-kv root 是 `fixtures/historical/sibling-workspaces/mini-kv/`，当前统计为 174 个文件、77 个 JSON，release JSON 也为 77 个，版本跨度 v91-v610。manifest 不是逐文件巨表，而是一个维护索引：它告诉读者这些文件族是什么、为什么冻结、以后新增证据怎么做。

这些 fixture 不是 live upstream state。Java 和 mini-kv 可以继续并行推进自己的 playbook，但 Node v2117 不要求它们产生新版本，也不应该写回它们的仓库。用户之前反复强调三项目并行时不能让 Node 乱做其他项目工作；N3 正好把这条边界制度化。Node 可以读它们的冻结证据，可以检查它们是否有需要的产物，但除非后续计划明确要求并且用户授权，Node 不改 Java/mini-kv。

这个规则也能降低三项目协作成本。Java session 和 mini-kv session 可以继续按各自 playbook 写本仓库进度文件，Node 只在需要消费新证据时同步冻结 snapshot。这样三边不会同时写同一个 repo，也不会让 Java/mini-kv 因为 Node 的文档版本停工。N3 把“recommended parallel”写进边界文档和 evidence summary，就是为了让后续操作不再靠口头提醒。

配置证据方面，`src/config.ts` 仍是核心事实源。upstream probes/actions、access guard enforcement、auth token secret、audit store kind/url 都有默认值。N3 文档没有复制完整 config，而是把生产边界相关的默认值提炼出来。这样读者不用翻几百行配置，也能知道当前默认运行为什么安全：它不会自动联通上游，不会默认执行写动作，不会默认拥有生产 secret。

## Service Flow / 服务流程

本版流程分为四段。第一段是事实采集：用 CodeGraph 找 production readiness、release evidence gate、deployment safety、rollback runbook、audit store runtime profile，再用 `rg` 和目录扫描确认配置默认值、fixture 数量和近期 tags。第二段是文档落地：新增 production boundaries、CHANGELOG、fixtures manifest，并更新 AGENTS 的版本完成规则。第三段是测试固化：新增 `productionExcellenceDocs.test.ts`，让 CI 对文档里的核心语义做最小但有效的回归检查。第四段是归档：写 v2117 evidence、archive note、中文代码讲解，并继续走 typecheck、lint、coverage、build、CI 的版本收尾。

其中最关键的设计选择是“文档加测试”。纯文档版本常见问题是很快过期，尤其当项目进入快速版本推进时，新的服务和规则会绕过老文档。N3 的测试没有试图把文档所有文字锁死，只锁关键事实：生产未授权、upstream actions 是停机条件、git tag 是版本主线、fixtures 是冻结证据。这个粒度足够轻，不会让文档每改一句就坏；也足够硬，不会让核心边界悄悄消失。

另一个设计选择是把 AGENTS 规则与 CHANGELOG 接起来。以前版本完成规则要求 typecheck、测试、build、讲解、计划、commit/tag/push，但没有强制 changelog。N3 增加一条：完成版本时更新 `CHANGELOG.md`，git tags 保持 canonical milestone version，`package.json` 继续 `0.1.0`，直到将来 packaging/release workflow 明确改变政策。这样从 v2117 开始，版本记录不再只散在 commit history 和 archive docs 里。

这个规则不会要求每个微小 commit 都写 changelog。它要求的是“完成 Node 版本”时写，因为用户的工作方式是按 vNNNN 版本推进。一个版本可以含多个文件和多轮验证，但最终 tag 前要有一条人类可读的版本记录。这样长期看，CHANGELOG 会成为跨会话恢复上下文的第一入口：先看最近几个版本做了什么，再决定计划下一刀切在哪里。

## Safety Boundary / 安全边界

v2117 的安全边界比功能版本更简单：没有启动 server，没有跑 HTTP smoke，没有生成 screenshot，也没有触碰 live upstream。它只读取代码、docs、fixture 目录和 git tag 信息。新增文件都是文档、测试和版本证据，不会影响 runtime import graph。唯一新增的测试读取 Markdown 和 AGENTS 文件，不访问网络、不写文件、不启动外部进程。

这并不表示 N3 不重要。相反，生产边界越早写清楚，后续真正接近 shard preview、read-only cross-project consumption 或 real execution 时越不容易误操作。文档里列出的 stop conditions 包括 `UPSTREAM_ACTIONS_ENABLED=true`、任何 evidence gate 报 `executionAllowed=true`、读取 credential value、解析 raw endpoint URL、自动启动 Java/mini-kv、改动 frozen sibling fixtures、引入 production secret 或 deployment/rollback/schema migration/restore execution。后续版本如果碰到这些条件，就必须停下来写新计划，而不是顺手推进。

fixture manifest 的安全价值也很直接。历史证据解析经常依赖固定路径和固定片段，随意格式化或移动文件可能导致旧 profile blocked，甚至造成难以定位的连锁失败。v2116 刚经历过一次命令契约级联问题，N3 顺势把 fixture 稳定性制度化，是合理的工程节奏：先让 CI/coverage 更硬，再让边界和证据来源更可维护。

## Test Coverage / 测试覆盖

focused test 是 `npx vitest run test/productionExcellenceDocs.test.ts -- --testTimeout=180000`，结果 1 个文件、4 个测试通过。四个测试分别覆盖生产边界、版本政策、fixture manifest 和 AGENTS changelog 规则。这个测试不是为了提高覆盖率数字，而是为了防止后续文档整理时删掉关键安全语义。

后续 closeout 会继续跑 typecheck、lint、coverage 和 build。因为 v2117 新增的是测试文件和文档，typecheck 能确认新增 test 的 TypeScript import/typing 没问题，lint 能确认测试没有风格错误，coverage 能确保新增测试在全套中稳定，build 能确认文档变动没有影响编译。CI 仍会运行 Node Evidence workflow，也就是 typecheck、lint、coverage、build 和 safe smoke。虽然 v2117 本地不需要启动 server 来验证新文档，但 CI smoke 会继续守住主 workflow。

这次测试粒度也给 N4/N5 留了方法：文档型治理可以配一个小而硬的测试，功能型治理才需要 route/service 层测试。不要把所有文档都塞进测试，也不要让测试只检查文件存在。N3 选的是“存在 + 关键语义 + 版本跨度 + policy 句子”，刚好能覆盖维护风险。

## One-sentence Summary / 一句话总结

v2117 把 Node 当前“证据链成熟但仍未授权生产执行”的事实写成生产边界、版本政策和 fixture 冻结规则，并用 focused test 把这些后期维护纪律接入 CI。
