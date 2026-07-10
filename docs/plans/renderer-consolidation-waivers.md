# Renderer consolidation waivers

N1 的唯一豁免类型是 `composition-only`。规范数据以
`docs/plans/renderer-consolidation-waivers.json` 为准；本文件提供给评审者阅读，
`test/rendererCensusScript.test.ts` 会校验三条记录与规范清单同步。

## 判定边界

豁免文件只能导入子渲染器并导出一个函数；该函数必须只返回数组，数组中的
每一项都必须是把同一个输入参数转发给已声明子渲染器的展开调用。文件不得
自行持有 Markdown 字面量、标题、空行、回退文案、循环、映射或行拼装规则。
`scripts/renderer-census.mjs` 使用 TypeScript AST 验证这些条件，并验证子调用
名称及顺序与 JSON 清单一致。文件消失、改用共享 builder、增加本地格式化、
更换子调用或出现重复清单项都会使 census 失败。

## 已批准项

| 文件 | 原因 | 评审检查 |
| --- | --- | --- |
| `controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts` | 仅按既有顺序合并 approval-packet 与 signed-approval-capture 两个子渲染器的 section 数组，不拥有格式。 | Builder migration would add indirection without removing formatting code. |
| `controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts` | 仅按既有顺序合并 import-profile 与 envelope-profile 两个子渲染器的 section 数组，不拥有格式。 | Builder migration would add indirection without removing formatting code. |
| `controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts` | 仅按既有顺序合并 submission 与 compared-evidence 两个子渲染器的 section 数组，不拥有格式。 | Builder migration would add indirection without removing formatting code. |

## 机械结论

关闭 N1 的命令是：

```powershell
npm run renderer:census -- --json
```

默认门槛同时要求原始未标准化文件不超过 3、豁免不超过 3、非豁免未标准化
文件严格为 0。三项豁免不是永久配额：任一文件后来被标准化时，旧豁免会被
判定为 stale，必须删除；新增第四项也会被 ratchet 拒绝。
