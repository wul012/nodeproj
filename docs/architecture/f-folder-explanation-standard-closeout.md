# f 目录解释标准收口

本标准把 `f/<version>/解释` 从“可写材料”收口为稳定的人类阅读证据。后续不继续无限新增解释质量规则，除非发现真实审计缺口。

## 当前硬门槛

| 项 | 要求 |
| --- | --- |
| 语言 | 中文书写 |
| 字数 | 每个版本级讲解至少 3000 个中文字符 |
| 字节 | 至少 9000 bytes |
| 路径引用 | 至少 4 个真实代码、测试、文档、证据或讲解路径 |
| 章节 | 目标与非目标、入口、响应模型、服务流程、安全边界、验证、下一步 |
| 图片目录 | 只有存在真实截图/图片时才创建 `图片` 目录，禁止空目录 |

## 必须说明的边界

- 是否 dry-run。
- 是否 read-only。
- 是否存在 production blocker。
- 是否启动 Java service。
- 是否启动 mini-kv service。
- 是否连接真实 managed audit。
- 是否允许生产写入。

## 禁止表达

- 禁止把 preflight 说成 production execution。
- 禁止把 route ready 说成人工已批准。
- 禁止把 historical fixture 说成当前 sibling service 运行结果。
- 禁止为了凑 3000 字堆重复套话；写不够时应加大版本真实工程工作量、拆分重构深度或验证覆盖。

## 收口条件

`src/services/fFolderExplanationQualityGate.ts` 已经检查长度、中文深度、路径密度、章节形态、占位信号、unsafe claim 和空图片目录。下一轮保养应优先用这套 gate，而不是继续叠加新规则。只有当审计发现现有字段无法表达真实风险时，才新增检查项。
