# v2190 Node 生产卓越轨道收口说明

## 本版解决什么问题

N0-N5 已经分别完成 lint、覆盖率、边界文档、可观测性、renderer 合并和源文件体积治理，但“这些局部结果是否共同达到 E1-E10”此前仍主要依赖人工阅读。v2190 把最后四个缺口变成长期会失败的门：ESLint warning 不得超过 261，覆盖率下限只向上调整，提交内容必须通过凭据与安全配置扫描，版本归档必须落在聚合、文件数、单版本、单讲解和受限目录预算内。

这不是功能版本。没有新增路由、报告链、上游调用、fixture 或执行授权；Java 与 mini-kv 没有被启动、构建、测试或修改。版本只改变 Node 自身的质量门、CI 顺序、配置模板和事实文档。

## 两个新增机械门

`npm run security:scan` 扫描当前仓库文本，识别私钥块、常见云与平台 token、带凭据的连接 URL，以及 `.env*` 中非空 secret/password/token 配置。历史测试里确实存在用于验证脱敏的合成 URL，所以 waiver 不能写成“忽略 test 目录”，而是逐项固定路径、信号类型、匹配文本 SHA-256 和次数；新增、减少、修改或移动任何一项都会失败。扫描还核对 18 个安全配置事实，包括默认关闭上游动作、生产模板留空秘密、CI 不开放动作等。

`npm run archive:retention:census` 按 `docs/archive-retention-budget.json` 读取 `a/` 到 `f/`、四个代码讲解根、fixtures 和三卷 plans。输出每个根的文件数与字节数、最大版本目录、最大讲解和受限目录大文件，并对 80 MiB 聚合、8000 文件、1 MiB 单版本、64 KiB 单讲解及各目录预算逐项判定。它不会移动或删除历史文件；超限时必须停止版本并作真实留存决策，不能通过改 fixture 或提高预算来掩盖增长。

## 质量棘轮与文档事实

v2189 CI 的实际覆盖率为 statements 95.92%、branches 87.59%、functions 98.64%、lines 95.88%。旧门槛 93/85/96/93 与实际值相差超过两个百分点，因此按简报规则上调到 94/86/97/94，仍保留合理波动空间。lint 当前为零错误、261 warnings；`--max-warnings 261` 让 warning 数量也具有机械上限，而不是只在讲解中记录。

README 的普通启动示例不再把 probes/actions 都设为 true；默认示例保持 false。START_HERE、PRODUCTION_BOUNDARIES 与最终证据统一使用“single-project validation + cross-project contract alignment”，明确 C1-C4 尚未执行、生产执行未授权。通过 E1-E10 只说明 Node 单仓质量闭环，不等于三个真实进程已经联合运行。

## 验证与停止条件

验证顺序是新增门的正负测试、文档事实测试、typecheck、lint、两个 census、renderer/source-size 棘轮、完整 coverage、build、受控 Node HTTP smoke 和 Playwright 页面检查。最终 CI 仍在 probes/actions false 的环境中执行并按 PID 停止服务。任一门失败、覆盖率门槛被降低、warning 上限被放宽、waiver 变宽、归档预算被无证据抬高、文档提前声称 capstone 完成，都会使本版不能收口。

外部 closeout review PASS 仍是下一道边界。本版完成、tag、push 且 Node Evidence 变绿后停止，不自行开始 C1-C4。
