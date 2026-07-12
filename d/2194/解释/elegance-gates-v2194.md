# v2194 Elegance Gates 说明

## 目标与边界

本版是 Node Elegance Hotspot Program 的 E-N1，只建立机械门，不重命名任何
`src` 文件或导出，也不改变 route、fixture、report bytes、renderer waiver 或
运行时行为。reviewer 新增的 AGENTS Elegance Gates 与两份 final-push 评审追加
一并保留并提交。

新增 `scripts/elegance-census.mjs` 扫描 `src/**/*.ts`：文件规则计算 `.ts` 前的
stem，导出规则使用 TypeScript AST 覆盖声明、变量 binding 与 alias re-export；
结构 family 使用相对目录和 stem 末端角色词。普通命令与 `--json` 只读，只有
显式 `--refresh-baseline` 写入 `docs/plans/elegance-baseline.json`。

## 初始债务合同

- Source files：1245。
- Over-budget names：4592，其中 filename 993、export 3599。
- Structural families：134，其中 threshold=3 的 tracked families 为 52。
- 最大 family：renderer 245、types 221、verification 100、routes 73。
- Baseline：65 行、1921 字节，SHA-256
  `375010123d263b97501d44be60756b58e51cdadf8e7e418d50b74a41063502cf`。

baseline 保存 4592 个排序 key 的 SHA-256、filename/export 分类计数与 family
ceilings；完整违规仍由 `--json` 逐项报告。name debt 增长、收缩未同步、同数量
替换、第三个 family 或新增 family 成员都会失败。第一轮 444454 字节的逐文件
baseline 被 archive-retention 的 128 KiB bounded-file 门拒绝，本版没有放宽预算。

## 最终验证

focused `test/eleganceCensus.test.ts` 共 5 项通过，覆盖 live 对账、默认 JSON
不改 baseline 字节、超长 filename/direct export/re-export、第三成员、family
增长、债务收缩未同步、同数量替换和 CLI 非零退出。walkthrough/readability focused
3 文件 9 项通过，archive/elegance focused 2 文件 7 项通过。完整 Vitest 使用
16 个顺序 shard、每片最多 2 worker，558 个测试文件、1702 项测试全部通过；
typecheck、build 通过，lint 0/261，security 18/18，renderer 242/3/0，source-size
0 oversized，archive 与 elegance census 绿色。机器明细见
`d/2194/evidence/elegance-gates-v2194-summary.json`。

本版没有 UI、HTML、浏览器交互或运行时页面变化，因此不创建图片目录。机器 JSON、
baseline digest、负向测试、完整门禁和 CI 比 Markdown 截图提供更强证据。
