# v2174 说明：file-reference exists 归一化修复

## 背景

v2173 推送后，GitHub Actions run `28851570922` 仍然在
`test/rendererMigrationV2170Parity.test.ts` 的 `artifactIntakePreflight` case
失败。失败不是产品 renderer 把业务字段写错，而是迁移 parity 测试的比较面仍然带入了
checkout-local 证据文件状态：本地 Windows 有直接 sibling Java/mini-kv evidence 文件，Linux
runner 没有这些直接文件，所以 JSON file-reference 对象里的 `exists` 值不同。

v2173 已经把 `byteLength` 和 `digest` 这类文件元数据归一化，但还保留了 `exists`。
两个本地 `exists:true` 与两个远端 `exists:false` 组合起来，正好造成剩余 20 个字符漂移。

## 本版改动

- 扩展 `test/rendererMigrationParityUtils.ts`，让 JSON file-reference
  `exists`/`byteLength`/`digest` 三元组一起归一化。
- 更新 `test/rendererMigrationV2170Parity.test.ts` 中 `artifactIntakePreflight`
  在新比较面下的长度与 SHA-256 指纹。
- 保持产品 renderer、loader、route、schema、fixture 和真实 Markdown 输出不变。

## 边界

这次归一化只用于 renderer migration parity 的 hash 计算。真实报告仍然会展示证据文件是否存在、
字节长度和 digest，因为这些信息对人工审计有价值。测试里剥离它们，是为了证明 builder 迁移没有改动
Markdown 结构和业务字段，而不是为了证明当前机器上每个 sibling 文件都存在。

不能归一化的内容仍然包括 section 标题、检查项名称、检查结果、summary、warning、recommendation
和 readiness 决策。后续如果 parity 再失败，只能继续处理路径或 checkout-local 文件元数据；如果失败来自
业务字段或结构，就必须回到 renderer/loader 做真实 diff。

## 已验证

已通过 focused parity：

```powershell
npx vitest run test/rendererMigrationV2169Parity.test.ts test/rendererMigrationV2170Parity.test.ts --maxWorkers=2
```

结果：2 个测试文件通过，2 个测试通过。

后续仍需完成 typecheck、文档质量门、lint、build 和 v2174 远端 CI。
