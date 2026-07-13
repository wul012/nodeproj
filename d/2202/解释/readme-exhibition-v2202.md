# v2202 README 展示版说明

本版只重构公开文档入口，不改变 Fastify route、service、renderer、fixture、跨项目合同或运行时配置。旧 README 把数百条历史 evidence 功能逐项列出，真实强项和当前边界很难被快速识别；新结构改为徽章与定位、工程强度表、双通道架构图、可复现命令、证据地图和边界六部分。

首页数字全部连接到已提交来源：测试总数取自 v2201 全量报告，覆盖率取自 v2190 E1-E10 closeout，lint 与源码尺寸取自 v2189，renderer 由 census 与 AST waiver manifest 共同解释，命名债由 elegance baseline 约束。百分之九十五点九徽章是 statements 百分之九十五点九二的一位小数展示，完整四维值仍保留在表格中。

成熟度标签、C1-C4 program-end PASS、not authorized for production execution，以及两条默认 false 的 PowerShell 配置均按既有测试契约原样保留。capstone 图只表达 Java HTTP GET、mini-kv fresh CLI read 和 aiproj artifact file read，最终边界仍是 `read_only=true` 与 `execution_allowed=false`。本版不触发 live capstone，因为没有修改 `src/integration/**`、报告 schema 或上游 probe contract。

视觉证据来自 GitHub GFM API + GitHub Markdown CSS 的本地渲染。Playwright MCP 验证 1440x1000 桌面与 390x844 手机视口；第一次发现 Mermaid 长节点裁字后缩短标签并重排两条 lane，最终四个徽章无加载失败、Mermaid 生成一个有效 SVG、页面无整体横向溢出。归档截图见 `d/2202/图片/readme-exhibition-v2202.png`。

Java、mini-kv 和 aiproj 可以独立并行。本版没有启动、停止、构建或修改 sibling 项目，也没有读取新鲜上游 evidence。完成 commit、v2202 tag、push 和绿色 Node Evidence 后立即停止，不开启 Stage 2。

最终本地门已完成：focused 文档/讲解三文件十五项通过，typecheck 与 build 通过，lint 零错误/一百八十 warning，security 十八项配置检查全过，五类 census 均 ready；完整 Vitest 以八个顺序 shard、每片最多两个 worker 执行，一千一百四十一套件、一千七百一十六项测试全部通过，零失败、零 pending。
