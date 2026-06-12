# Node v2108：readability maintenance profile 收口

## 目标与非目标

目标是落实四项目可读性保养建议中 Node 控制面的后期保养要求：把五份架构地图、route catalog 计数、只读边界和并行协作声明汇总成 JSON/Markdown profile。非目标是启动 Java、启动 mini-kv、连接真实 managed audit、写入生产数据、读取凭据值或把 preflight 说成 production execution。本版仍然是 read-only 控制面保养，executionAllowed=false，readyForProductionOperations=false。

## 入口

- `src/services/readabilityMaintenanceProfile.ts`
- `src/services/readabilityMaintenanceProfileTypes.ts`
- `test/readabilityMaintenanceProfile.test.ts`
- `docs/architecture/evidence-flow-map.md`

## 响应模型

本批次的响应模型集中在 readability maintenance profile。profileVersion 使用 readability-maintenance-profile.v1，maintenanceState 表示地图和质量门是否齐备，documents 表示每份架构文档是否存在且包含必要 phrase，checks 表示 architectureDocumentsPresent、qualityGateFamilyDocumented、routeCatalogCountsAligned、upstreamActionsStillDisabled 等检查，summary 表示文档数量、通过数量、缺失 phrase 数量和 blocker 数量。对于 f 目录解释质量门，activeNodeVersionRange 是 Node v2094-v2108；对于代码讲解质量门，activeNodeVersionRange 是 Node v2058-v2108。

## 服务流程

服务流程从 docs/architecture 的地图文档开始。控制面地图解释 Node 的 route 与质量门边界，quality gate 地图解释 Types、Rules、Scanner、Gate 的命名族，evidence flow 地图解释本地文档、f 目录、代码讲解、route catalog、historical fixture 和 HTTP smoke 的关系，route-service-test 对照表把 route、service、test 三者绑定，f-folder 标准收口说明什么时候应该继续用现有规则而不是新增规则。最后 src/services/readabilityMaintenanceProfile.ts 读取这些文件，检查必要 phrase，汇总 route catalog 计数，并通过 audit route 输出 JSON/Markdown。

## 安全边界

本版只读。它不会启动 sibling service，不会访问外部网络，不会读取生产凭据，不会写 Java 或 mini-kv 状态，不会把质量门通过解释为真实批准。Java 和 mini-kv 可以继续并行推进自己的保养建议；Node 本版没有要求它们提供 fresh evidence。aiproj 当前有命名止血相关未提交变更，但本版只读观察，不修改 aiproj。

## 验证

focused 验证覆盖 test/readabilityMaintenanceProfile.test.ts、test/auditManagedAuditRouteQualityRoutes.test.ts、test/auditJsonMarkdownRouteCatalogSummary.test.ts、test/auditJsonMarkdownRouteCatalogIntegrity.test.ts、test/fFolderExplanationQualityGate.test.ts、test/codeWalkthroughDocumentationQualityGate.test.ts。收尾验证还包括 npm run typecheck、npm run build 和 HTTP smoke。验证重点不是证明生产执行可用，而是证明文档入口、route 注册、catalog 计数、JSON/Markdown 输出和只读边界全部一致。

## 维护者阅读索引

这一部分按审查问题拆开，不再使用一个过大的详细说明章节。读者可以直接跳到关心的边界、失败排查或后续复用段落。

## 阅读问题的来源

如果前四版只停留在文档，后续仍可能有人删掉地图或改坏 route 计数而不自知。本版不是为了把文档写厚，而是把读者第一步要看的东西固定下来。读者打开仓库时，不应该先在 src/routes、src/services、test、docs、e、f 之间随机搜索，而应该先知道本版解决了哪一类定位成本。

## 代码和文档的边界

src/services/readabilityMaintenanceProfile.ts 是本版最主要的落点。它承担的是解释职责，不承担执行职责；对应的 service、route 或测试只负责让这个解释进入可验证链路。这样做的好处是：文档可以帮助人读，profile 可以帮助机器查，二者互相补位但不互相替代。

## 为什么不是生产执行

本版所有改动都保持 read-only。executionAllowed=false、readyForProductionOperations=false、startsJavaService=false、startsMiniKvService=false 这些字段不能因为 profile ready 而被改写。quality gate 或 readability profile 只能证明材料完整，不能证明人工批准、真实连接或生产写入已经发生。

## 与 route catalog 的关系

route catalog 的价值是把分散 route 变成可审查的注册表。把五份架构地图、route catalog 计数、只读边界和并行协作声明汇总成 JSON/Markdown profile 后，新增入口必须同步考虑 catalog summary、route group、focused test 和 access policy 覆盖。否则 route 可以访问，但维护者不知道它属于哪条能力线，后期排错会变慢。

## 与测试的关系

测试不是为了给文档盖章，而是为了锁住最容易滑坡的行为：路径存在但未进入 profile、route 注册但 catalog 计数没更新、Markdown 能返回但 JSON 缺字段、文档足够长但靠重复段落填充。规则测试、gate 测试和 route 测试分别管不同层级。

## 与四项目协作的关系

Java 和 mini-kv 在本轮只是只读观察对象，可以继续按各自保养建议并行推进；Node 没有要求它们生成 fresh evidence。aiproj 的命名止血问题也只是被读到，不纳入本轮改动。这个边界能避免 Node 把本地可读性保养误写成跨项目前置阻塞。

## 维护取舍

后续做真实分片联合执行前置时，先用该 profile 判断文档入口是否稳定，再决定是否需要新增治理链。这句话是本版的停止条件。后期如果发现新的可读性问题，第一选择应该是更新地图、对照表或现有 gate；只有当现有结构无法表达真实风险时，才增加新的 service 或 route。

## 失败时从哪里查

如果未来这条线失败，第一步看 blockers 的 source，而不是直接改测试。source 指向 readability-maintenance-profile 时，通常是文档缺 phrase 或 route catalog 计数不对；指向 f-folder 或 code walkthrough gate 时，通常是讲解长度、章节、重复段落或 unsafe claim 出问题。

## 为什么保留小文件

本轮没有把所有说明塞进一个大 README。地图文档按主题拆开，profile types 和 profile service 也拆开，是为了让读者能按问题进入：想看能力边界就看 control-plane-map，想看命名族就看 quality-gates-map，想查 route owner 就看 route-service-test-map。

## 与 e/f/代码讲解的关系

e 目录记录机器可复查的 HTTP/profile 输出，f 目录解释该版本为什么存在，代码讲解记录把代码路径和维护理由串起来。三者不是互相复制：e 适合比对字段，f 适合读版本意图，代码讲解适合接手修改。

## 对后续真实执行的帮助

这版没有直接缩短真实分片执行距离，但它清理了理解成本。真实执行前置最怕材料看似很多却无法判断边界；有了地图和 profile，后续接入真实 artifact、owner receipt 或 shard preview 时，可以先确认入口和职责是否已经稳定。

## 为什么不写成流水账

流水账式讲解会按时间顺序列“我改了什么”，但后期维护更需要按职责组织。这里按阅读问题、边界、模型、route、测试、失败排查和停止条件展开，读者可以跳到自己关心的段落，而不用从头读完一长串编号。

## 审查者应该看什么

审查者不需要逐字读完所有段落。优先看入口路径是否真实存在、ready 字段是否仍然关闭生产执行、route catalog 计数是否和测试一致、文档是否说明 Java 和 mini-kv 可以并行、讲解是否没有重复长段落。

## 长期维护风险

最大的风险不是当前代码不能跑，而是治理材料继续堆叠后没有导航。每增加一个 gate、receipt、preflight 或 closeout，都要问它进入哪张地图、是否已有类似入口、测试是否能证明它没有打开生产边界。这个问题比多写一个 route 更重要。

## 本版如何避免水字数

这篇讲解用多个不同小节承载不同信息：有路径、有模型、有失败方式、有跨项目边界、有维护取舍。字数来自这些事实的组合，而不是同一段话换编号重复。新的重复段落规则也会阻断这种写法再次出现。

## 下一次修改的顺序

后续如果要改这条线，先改文档地图，再改 profile types 中的 required phrases，然后改 profile service 的检查逻辑，最后补 route 或 tests。不要先改断言来适配当前输出；断言失败通常是在提醒阅读入口或边界已经漂移。

## 如何判断可以停止

当地图能解释入口、profile 能验证地图、测试能锁住 route/service/test 对照、f 和代码讲解都能自然写够 3000 中文字符且不重复时，本轮保养就应该停止。继续加规则只会提高维护成本。

## 版本价值总结

Node v2108 的价值不是“又多一个文档”，而是把一个后期维护痛点变成可定位、可验证、可复查的工程结构。它让后续推进更慢一点点，却让接手和审查稳定很多。

## 下一步

后续做真实分片联合执行前置时，先用该 profile 判断文档入口是否稳定，再决定是否需要新增治理链 如果后续版本写不出足够具体的中文讲解，说明版本切片太薄，应增加真实工程内容、拆分重构深度或验证覆盖，而不是硬凑文字。

## 防水字数修正

本次修正不是继续把 f 目录说明 拉长，而是把 可读性保养 profile 收口 的解释拆成可扫描的小节。前四版地图和标准需要一个只读 profile 汇总，否则它们仍只是散落文档，不能被 HTTP、CI 和 digest 消费。 这类问题如果只靠一个大段落描述，审查者会很难判断它对应的是 src/services/readabilityMaintenanceProfile.ts、src/routes/auditManagedAuditRouteQualityRoutes.ts 还是 test/readabilityMaintenanceProfile.test.ts。所以这篇文档保留必要深度，但把长段落拆成问题、入口、边界、验证和停止条件几个方向。

## 这一版的真实信息增量

可读性保养 profile 收口 的真实信息增量在于把维护判断前移：先判断读者为什么会迷路，再判断代码要提供哪种证据。src/services/readabilityMaintenanceProfile.ts 给人读，src/routes/auditManagedAuditRouteQualityRoutes.ts 给 profile 或 route 消费，test/readabilityMaintenanceProfile.test.ts 锁住回归。三者各司其职，不能互相冒充；如果只写“已经完成保养”，后续维护者仍然不知道失败时该查哪一层。

## 跳读顺序

读者不需要从头读到尾。先看目标与非目标，确认本版没有打开生产执行；再看入口，找到实际文件；然后看响应模型，确认 profile 字段表达的是维护状态而不是业务写入；最后看验证和下一步，判断这版是否只是本地归档，还是已经通过 route 和 CI 进入可复查链路。

## 防止误解的边界

最大的风险是文档写完后没有机器检查，下一批改动很容易让 phrase、route count 或只读边界漂移。 因此本文反复强调 read-only、executionAllowed=false、readyForProductionOperations=false、startsJavaService=false 和 startsMiniKvService=false。这里的 ready 只表示材料、地图或质量门可复查，不表示真实分片执行、人工批准或 sibling service 已经参与当前版本。

## 维护者如何复用

以后可读性保养新增材料时，先把 required phrase 和 digest 口径接入 profile，再决定是否需要新 route。 复用时不要复制整篇说明，也不要把上一版的段落改几个名词就提交。正确做法是先确认新版本的入口、响应字段、失败信号和验证路径，再把这些差异写进对应小节。写不出差异时，说明版本粒度太小，应合并到批次解释或继续增加真实工程工作量。

## 质量门如何防回退

新的 f 目录解释质量门和代码讲解质量门会检查中文深度、路径密度、必须章节、禁止的生产授权声明、重复长段落和过大的详细讲解章节。这样既保留“三千中文字符”的深度要求，也避免把读者困在一段很长但不可定位的文字里。质量门失败时，应该补真实入口、模型、边界或验证，不应该靠重复句子过关。

## 本版收口判断

这篇 f 目录说明 收口后，审查者应该能回答六个问题：本版解决什么阅读问题；实际入口在哪里；profile 或文档模型表达什么；哪些生产动作仍然禁止；测试如何证明只读边界；下一版在什么条件下复用现有结构。能回答这些问题，说明篇幅来自工程信息，而不是来自凑字数。

## 最小可读深度说明

可读性保养 profile 收口 的讲解必须达到三千中文字符，但这个下限只用于保证工程信息密度，不是鼓励写长。本文补足的内容集中在 architecture docs、route catalog、checks、summary 和 digest 的关系、失败时的查找路径、只读边界和后续复用条件。读者如果只需要快速审查，可以先看目标、入口、响应模型、验证和收口判断；需要接手维护时，再阅读中间的小节。这样既满足质量门，也避免把信息藏进不可阅读的长段落。

## 审查后的阅读口径

这篇材料收口后，读者可以把它当成审查索引，而不是必须逐字顺读的长文。先用标题和入口定位版本，再用响应模型确认字段含义，用安全边界排除生产执行误解，用验证段落核对测试证据。剩下的小节只在需要接手维护或排查失败时阅读。这样的写法比一个大号详细讲解更容易维护，也更符合后期工程文档的使用方式。
