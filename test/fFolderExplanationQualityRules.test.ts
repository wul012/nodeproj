import { describe, expect, it } from "vitest";

import { evaluateFFolderExplanationDocument } from "../src/services/fFolderExplanationQualityRules.js";
import {
  F_FOLDER_EXPLANATION_MIN_BYTES,
  F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS,
  type FFolderExplanationDocumentScan,
} from "../src/services/fFolderExplanationQualityTypes.js";

describe("f-folder explanation quality rules", () => {
  it("accepts a long Chinese explanation with code paths, verification, and safety boundary", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(longChineseExplanation()));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(true);
    expect(result.meetsMinimumLength).toBe(true);
    expect(result.meetsChineseDepth).toBe(true);
    expect(result.hasEnoughCodePathReferences).toBe(true);
    expect(result.missingRequiredSections).toEqual([]);
    expect(result.placeholderSignals).toEqual([]);
    expect(result.repetitiveParagraphSignals).toEqual([]);
    expect(result.oversizedDetailedSectionSignals).toEqual([]);
    expect(result.forbiddenExecutionClaimSignals).toEqual([]);
  });

  it("blocks short enforced explanations even when they have a title", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(`
# Node v2099：太短的讲解

## Goal / 目标

只写一句话不够。
`));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(false);
    expect(result.byteLength).toBeLessThan(F_FOLDER_EXPLANATION_MIN_BYTES);
    expect(result.chineseCharacterCount).toBeLessThan(F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS);
    expect(result.meetsMinimumLength).toBe(false);
  });

  it("blocks forbidden production authority claims in explanations", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(
      longChineseExplanation().replace("productionAuthority=false", "productionAuthority: true"),
    ));

    expect(result.compliantWithCurrentStandard).toBe(false);
    expect(result.forbiddenExecutionClaimSignals).toContain("productionAuthority:\\s*true");
  });

  it("rejects repeated long paragraphs that pad explanation length", () => {
    const repeated = "这段说明看起来很长，但它只是在重复同一段维护解释，没有增加新的入口、响应模型、服务流程、安全边界或验证细节。真正的 f 目录说明应该服务审查和交接，而不是把同一句话换一个编号再贴一次。";
    const result = evaluateFFolderExplanationDocument({
      ...documentWithText(`
# Node v2109：重复段落示例

## Goal / 目标

目标是验证重复段落检测，非目标是生产执行。

## Entry Point / 入口

- \`src/services/readabilityMaintenanceProfile.ts\`
- \`test/fFolderExplanationQualityRules.test.ts\`
- \`docs/architecture/control-plane-map.md\`
- \`f/2109/解释/example.md\`

## Response Model / 响应模型

profile、checks、summary。

## Service Flow / 服务流程

src/services/readabilityMaintenanceProfile.ts 读取 docs/architecture 并汇总。

## Safety Boundary / 安全边界

read-only，executionAllowed=false。

## Verification / 验证

test/fFolderExplanationQualityRules.test.ts。

## 详细说明

1. ${repeated}

2. ${repeated}

3. ${repeated}

## Next Action / 下一步

重复长段落应该失败。
`),
      versionNumber: 2109,
    });

    expect(result.repetitiveParagraphSignals).toHaveLength(1);
    expect(result.compliantWithCurrentStandard).toBe(false);
  });

  it("rejects one oversized detailed explanation section", () => {
    const oversizedDetail = "这段内容模拟把所有维护说明塞进一个详细说明章节，读者只能被迫顺序阅读，无法按入口、模型、安全边界和验证快速定位。".repeat(130);
    const result = evaluateFFolderExplanationDocument({
      ...documentWithText(`
# Node v2110：过大的详细说明章节

## Goal / 目标

目标是验证详细说明不能独占全文，非目标是生产执行。

## Entry Point / 入口

- \`src/services/fFolderExplanationQualityRules.ts\`
- \`src/services/fFolderExplanationQualityGate.ts\`
- \`test/fFolderExplanationQualityRules.test.ts\`
- \`docs/architecture/f-folder-explanation-standard-closeout.md\`

## Response Model / 响应模型

profile、checks、summary、blockers。

## Service Flow / 服务流程

src/services/fFolderExplanationQualityRules.ts 先扫描章节形状，再输出质量信号。

## Safety Boundary / 安全边界

read-only，executionAllowed=false。

## Verification / 验证

test/fFolderExplanationQualityRules.test.ts。

## 详细说明

${oversizedDetail}

## Next Action / 下一步

详细说明过大时应该拆成多个可定位章节。
`),
      versionNumber: 2110,
    });

    expect(result.oversizedDetailedSectionSignals).toHaveLength(1);
    expect(result.compliantWithCurrentStandard).toBe(false);
  });
});

function documentWithText(text: string): FFolderExplanationDocumentScan {
  return {
    relativePath: "f/2099/解释/f-folder-explanation-quality-type-contract-v2099.md",
    versionNumber: 2099,
    fileName: "f-folder-explanation-quality-type-contract-v2099.md",
    title: "Node v2099：f 目录讲解质量类型契约",
    byteLength: Buffer.byteLength(text),
    lineCount: text.split(/\r?\n/).length,
    text,
    explanationDirAligned: true,
  };
}

function longChineseExplanation(): string {
  const deepExplanation = [
    "这一版的目标是把 f 目录中的中文讲解从人工约定变成可验证的工程契约。讲解不能只写结论，而要说明为什么改、入口在哪里、响应模型如何表达、执行流程如何被限制、哪些安全边界没有被打开，以及最终用哪些测试和 smoke 证明。",
    "维护者阅读 f 目录时，最怕看到一篇只有版本名和一句完成说明的短文。这样的材料无法帮助审查者判断 route 是否只读、profile 是否只是质量门、归档是否来自真实 HTTP 输出，也无法说明 Java 和 mini-kv 是否被启动。",
    "因此合格说明必须把代码路径、测试路径、证据路径和停止条件放在同一篇文档里。路径引用不是装饰，它让后续排查可以从 f 说明直接跳到 src、test、docs 和 e 目录，而不需要靠记忆猜测。",
    "安全边界必须写得具体。read-only、executionAllowed=false、readyForProductionOperations=false、productionAuthority=false 这些字段各自表达不同层级，不能被一个笼统的安全声明替代，也不能因为 quality gate 通过就推导出生产执行可用。",
    "响应模型也需要解释清楚。profileVersion 用来稳定消费者，checks 用来表达逐项条件，summary 用来汇总计数，blockers 用来阻止下一步，qualityDigest 用来帮助判断证据是否变化。讲解应说明这些字段为什么存在。",
    "服务流程不能只写调用了某个函数。它要说明 scanner 收集事实，rules 判断单个文档，gate 汇总结果，renderer 输出 Markdown，route 负责注册 JSON/Markdown。职责分清以后，未来修改才不会把所有逻辑塞进一个巨型文件。",
    "验证部分要说明测试为什么必要。规则测试负责失败样例，gate 测试负责真实仓库扫描，route 测试负责访问和 Markdown 输出，typecheck 负责类型契约，build 负责构建产物，HTTP smoke 负责证明运行时路径可达。",
    "下一步或停止条件必须避免无限增长。如果已有 gate 能表达风险，就不要再新增一个相似质量门；如果讲解写不到足够深度，应该增加真实工程内容、拆分重构或验证覆盖，而不是复制段落凑字数。",
    "可读性也必须纳入标准。长文档不能把所有内容塞进一个详细说明章节，而应拆成审查者能跳读的小节。每个小节回答一个具体问题，例如入口在哪里、字段为什么存在、失败时看哪个 blocker、哪些外部服务仍然没有被启动。",
    "代码路径引用必须服务排查。src 路径说明实现位置，test 路径说明回归边界，docs 路径说明人类阅读入口，e 和 f 路径说明归档证据。把这些路径放在同一篇说明里，是为了让交接者不用重新构造上下文。",
    "质量门的失败信号也要可解释。短文本失败说明信息不足，重复段落失败说明存在水字数，过大的详细说明失败说明不可跳读，禁止生产授权声明失败说明边界被写错。不同失败信号对应不同修复动作。",
    "这类讲解不是替代代码审查，而是给代码审查减负。审查者仍要看具体 diff、测试和 route 输出，但讲解应先把核心判断口径摆出来，让审查从随机搜索变成有入口、有边界、有停止条件的阅读过程。",
    "讲解还要说明为什么当前版本不需要启动 sibling service。只读质量门只检查本仓库中的 Markdown、路径、字段和渲染结果，不能把 Java 或 mini-kv 的历史 fixture 写成当下 live 证据。这样写能防止后续把归档证据误读成真实执行结果。",
    "如果文档提到 route，它必须说明 access guard 和 Markdown 输出的关系。JSON 响应用于机器比对，Markdown 响应用于人工审查，access guard 用于证明 audit-read 边界仍然存在。三者都通过时，才能说该质量门进入可复查状态。",
    "如果文档提到 summary，它必须说明计数如何帮助维护者定位失败。shortExplanationCount 指向篇幅不足，shallowChineseExplanationCount 指向中文深度不足，lowCodePathDensityCount 指向路径密度不足，blockerCount 指向必须先修的断点。",
    "如果文档提到 digest，它必须说明 digest 不是审批签名。digest 只能稳定表达当前扫描事实，方便 CI 或后续版本发现漂移；它不能替代人工批准、生产变更单、真实凭据管理或外部系统执行回执。",
    "如果文档提到图片目录，它必须说明图片目录不是默认产物。只有确实存在页面、截图或渲染证据时才创建 f/<version>/图片；没有图片时保留空目录反而会制造误导，让读者以为证据缺失或上传失败。",
    "如果文档提到下一步，它必须有停止条件。停止条件可以是现有 gate 已能表达风险、route catalog 已能定位入口、讲解已经覆盖模型和验证，或者后续必须等待真实上游 artifact。没有停止条件的计划会让治理链条无限增长。",
    "如果文档提到重构，它必须说明拆分理由。把 scanner、rules、gate、renderer 和 route 拆开，是为了让事实收集、单文档判断、聚合状态、展示格式和 HTTP 注册分别演进，而不是为了制造更多文件名。",
    "如果文档提到 CI，它必须说明 focused test 与 full verification 的区别。focused test 用于快速定位规则和 route 失败，typecheck 用于类型契约，build 用于运行时产物，HTTP smoke 用于证明 route 可达。不能用某一个层级替代全部验证。",
    "如果文档提到四项目并行，它必须说明 Node 是否阻塞 Java 和 mini-kv。只读归档、历史 fixture 或本地质量门通常不是其他项目的前置审批；只有 Node 明确需要 fresh upstream evidence 时，才应该写清等待条件和版本号。",
    "如果文档提到三千中文字符，它必须说明字符数只是下限，不是目标本身。合格讲解应把新增信息分散到入口、模型、安全、验证、失败排查和复用条件里，让读者可以跳读；如果只能靠重复段落达到长度，就说明版本切片或实现深度不够。",
    "合格说明还应告诉维护者如何处理旧版本。旧版本可以被保留为历史材料，但新标准生效后的版本必须按当前规则写；迁移旧文档时要看它是否仍被 active version range 覆盖，不能把历史短文全部变成当前 blocker。",
    "合格说明应解释为什么 qualityDigest 参与归档。digest 让读者知道本次扫描事实是否被修改，尤其是 checks、summary 和 enforced documents 改动时，digest 会变化。它适合做回归比对，不适合当成业务结果。",
    "合格说明应解释为什么 renderer 不应该拥有业务判断。renderer 只负责把 profile 展示成 Markdown，业务判断留在 rules 和 gate；如果 renderer 开始决定 ready 状态，JSON 和 Markdown 就可能出现不一致。",
    "合格说明应解释 scanner 的失败语义。scanner 找不到目录、读不到 Markdown 或发现空图片目录时，代表归档结构有问题；这和单篇文档写得不够深入不是同一种失败，修复路径也不同。",
    "合格说明应解释占位词为什么危险。未完成标记、稍后补写提示和临时草稿说明会让读者以为材料还在建设中，如果这样的词出现在 enforced version，就不能对外声称该归档已经完成。",
    "合格说明应解释 forbidden claim 为什么要比普通文字更严格。生产授权、凭据读取、live upstream 写入这些词一旦写错，会影响后续审查判断，因此必须用规则直接拦截，而不是只放在人工检查清单里。",
    "合格说明应解释 code path density 的作用。路径数量不足通常表示讲解停留在概念层，没有把读者带到真实文件；路径过多但没有解释关系，也会变成噪声，所以讲解要说明每类路径的角色。",
    "合格说明应解释 shortExplanation 与 shallowChinese 的区别。短文本可能字节不足，中文浅度则表示大量内容被英文路径、字段名或列表占据。二者同时检查，能防止用路径清单冒充中文讲解。",
    "合格说明应解释 noEmptyImageDirectories 的原因。空目录会让归档看起来像遗漏截图，也会让后续自动化误判版本应该有图像证据。没有截图时不建目录，比建一个空目录更清楚。",
    "合格说明应解释 enforcedRequiredShapeMet 的价值。章节形状不是形式主义，它确保每篇文档至少覆盖目标、入口、模型、流程、安全、验证和下一步。缺一项时，读者就可能在关键判断上失去上下文。",
    "合格说明应解释 recommendation 的边界。recommendation 可以给维护建议，但不能掩盖 blocker；只要 blocker 存在，ready 字段就必须保持 false。这样可以避免用温和提示冲淡硬失败。",
    "合格说明应解释为什么测试样例本身也要够厚。如果测试用一个很短的样例冒充合格文档，规则就可能只在真实仓库里失败，单元层却给出错误信心。因此样例必须接近真实材料复杂度。",
    "合格说明应解释失败时的最短修复路径。先看 blockers，再看 summary 计数，最后打开对应 relativePath。不要先改阈值，也不要先重写 renderer；多数问题来自文档内容、路径密度或 unsafe claim。",
    "合格说明应解释为什么本规则仍然保持只读。它扫描本地 Markdown 和目录结构，不写归档、不创建图片、不启动服务器、不连接外部系统。修复文档是开发动作，质量门本身只是报告事实。",
    "合格说明应解释后续扩展的停止点。若未来需要检查图片尺寸、截图存在性或跨项目证据，也应优先扩展现有 scanner 和 gate，而不是为每个细节新建一套 route。只有职责边界真的不同，才值得新增服务族。",
    "合格说明还应解释人工阅读的顺序。读者先确认标题和版本，再看入口路径，然后看响应模型和安全字段，最后用验证段落判断是否可以信任当前归档。这个顺序能减少在多个目录之间来回跳转的成本。",
    "合格说明还应解释文档如何和代码一起演进。代码新增字段时，讲解要同步说明字段含义；测试新增失败样例时，讲解要说明失败场景；标准更新时，归档要说明旧材料是否需要迁移。这样文档才不会和实现脱节。",
  ].join("\n\n");
  return `
# Node v2099：f 目录讲解质量类型契约

## Goal / 目标与背景

${deepExplanation}

## Entry Point / 代码入口

本版入口是 \`src/services/fFolderExplanationQualityTypes.ts\`、\`src/services/fFolderExplanationQualityRules.ts\`、\`src/services/fFolderExplanationQualityScanner.ts\` 和 \`src/services/fFolderExplanationQualityGate.ts\`。测试入口是 \`test/fFolderExplanationQualityRules.test.ts\`。这些路径会被规则扫描出来，证明讲解确实指向代码而不是空泛复述。

## Response Model / 响应模型

质量门响应模型包含 profileVersion、qualityGateState、checks、summary、enforcedExplanations、blockers、warnings、recommendations 和 qualityDigest。每个 enforced explanation 都记录 byteLength、chineseCharacterCount、codePathReferences 和 complianceScore。

## Service Flow / 服务流程

扫描器从 \`f/<version>/解释\` 读取 Markdown，规则层计算中文字符数、代码路径数量、必须章节、占位符、重复段落和禁止的生产授权声明，然后 gate 汇总为只读报告。它只读取本地归档文件，不连接 managed audit，不启动 Java，也不启动 mini-kv。

## Safety Boundary / 安全边界

这条质量门只允许 read-only 检查。executionAllowed=false，readyForProductionOperations=false，productionAuthority=false。任何讲解如果把 productionAuthority 或 readyForProductionShardExecution 写成开启状态，都会被规则当成禁止声明。

## Verification / 验证

验证包括 \`test/fFolderExplanationQualityRules.test.ts\`、\`test/fFolderExplanationQualityGate.test.ts\`、\`npm run typecheck\`、\`npm run build\` 和 HTTP smoke。CI 仍然负责完整回归。

## Next Action / 下一步与停止条件

下一步是把 v2094-v2098 的旧短讲解加厚为中文长讲解，并把新质量门归档到 \`e/2099/evidence\` 和 \`f/2099/解释\`。停止条件是每个 enforced 文档都满足长度、中文深度、代码路径、验证、安全边界和无重复段落要求。
`;
}
