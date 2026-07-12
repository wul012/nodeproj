# v2194 Elegance Gates Roadmap

状态：本地实现与完整验证完成；等待 commit/tag/push/green CI。所有权：Node 会话。父计划：
`docs/plans/elegance-hotspot-program-node.md` 的 E-N1。

## Step-0 对账

- Node 基线为 `v2193` / `44657b738b63a85dd0e3c7788360825169388fc4`；
  Node Evidence run `29152905499` 绿色，远端与本地一致。
- 工作树只包含 reviewer 对 `AGENTS.md`、Java/Node final-push 简报的追加，以及
  本 E-track 计划；这些内容均保留并随 v2194 提交，不覆盖、不拆散。
- Java 最新已提交版本为 `v1857`，活跃工作树正在执行 v1858 提取，尚未触发
  Java final review 或 program-close。Node E-N1 可并行，不是 Java 的预批准阻塞项。
- mini-kv 已关闭 Stage-1，停在 `v1658` 并准备自己的 elegance 计划；Node 不修改
  或消费其未提交内容。

## 需求-证据矩阵

| 要求 | 实现 | 机械证据 | DONE |
|---|---|---|---|
| 40 字符命名 census | `scripts/elegance-census.mjs` 扫描 `src/**/*.ts` 文件 stem 与导出标识符 | live JSON + fixture 负向测试 | 所有超长项可复现、排序稳定，新项失败 |
| 结构 family census | 按“相对目录 + 文件 stem 的末端角色词”聚类并记录文件数 | 三成员与增长 fixture | 新 family 到 3 个或既有 family 增长时失败 |
| 只减 baseline | `docs/plans/elegance-baseline.json` 精确记录 name key-set digest、分类计数与 family counts | growth/shrink/replacement fixture | 当前债务与 baseline 完全对账；更新只能随真实收缩发生 |
| CI 门 | `package.json` 注册唯一命令，Node Evidence 在测试前执行 | 文档/脚本测试 + workflow diff | 本地与 CI 使用同一命令，普通运行不写 baseline |
| E-N1 收口 | CHANGELOG、版本解释、中文 walkthrough、机器 evidence | focused/full/build/lint/security/census/CI | commit/tag/push/green CI 后进入 E-N2 |

## Census 语义

1. 文件名长度只计算 `.ts` 之前的 identifier-bearing stem；路径目录与扩展名不计入。
2. exported identifier 由 TypeScript AST 读取直接导出声明、导出变量绑定与 named
   re-export；同一文件/名称去重，长度按 Unicode code point 计算。
3. structural family 是 `src` 内相对目录与 stem 最后一个非数字词的组合，例如
   `src/services:renderer`。它是重复热点筛选信号，不声称所有同 suffix 文件都相同。
4. family threshold 固定为 3；当前达到 threshold 的 family 全部进入 baseline。
5. normal/`--json` census 只读；只有显式 `--refresh-baseline` 才机械写入当前快照。

## 失败条件

- 用正则代替 TypeScript AST 猜测导出标识符，导致 alias/re-export 漏计 = 回退。
- 修改既有测试期望、冻结 fixture、route string、report bytes 或 waiver manifest = 回退。
- baseline 接受新增 name key、family 增长，或保留已消失债务而仍返回绿色 = 失败。
- `--json` 或 CI 运行写文件 = 失败；refresh 必须是显式维护动作。
- v2194 混入热点重命名、产品功能或重复 family 重构 = 回退；这些属于 E-N2+。

## 明确不做

- 本版不重命名任何 `src` 文件或导出，不修改运行时模块，不改变报告输出。
- 本版不判断 route/public contract 是否可改；只建立后续 top-5 选择所需事实。
- 本版不运行 live capstone。若 Java 在 v2194 边界前关闭，先完成本版再暂停 E-track。

## 并行状态

- Java：推荐并行继续 v1858+ 提取与 closeout；Node 不读取其未提交代码。
- mini-kv：可独立执行自己的 elegance gate；Node 与其没有写入冲突。
- v2194 完成后重新检查 Java final-review 状态，再决定进入 E-N2 或转 capstone。

## 本地执行结果

- 初始合同：1245 个源文件；4592 个超限名称（filename 993 / export 3599）；
  134 个 structural family，52 个达到 threshold=3。
- baseline 为 65 行 / 1921 字节，固定 name key-set digest、分类计数和 52 个
  family ceiling；默认与 JSON 命令均被测试证明不改 baseline 字节。
- focused elegance 5/5、walkthrough/readability 9/9、archive/elegance 7/7；
  typecheck 与 build 通过。
- 完整 Vitest 以 16 个顺序 shard、每片最多 2 worker 执行：558 文件、1702 项
  全部通过。2/8 的 timeout 未计作 PASS，本次遗留 PID 已精确停止。
- lint 0/261；security 18/18；renderer 242 standardized / 3 composition-only
  waivers / 0 non-waived；source-size 0 oversized；archive/elegance census 绿色。
- Java 已提交 v1859，v1860 正在进行，尚未触发 program-close；v2194 收口后可
  继续 E-N2，但每个版本边界仍须重新检查 Java final review。
