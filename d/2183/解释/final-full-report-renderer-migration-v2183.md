# v2183 说明：最后一组完整报告 renderer 归并

v2183 是纯重构版本，不增加新功能。它把 N1 清单中最后 11 个包含完整标题、元数据和多段正文的 Markdown renderer 接入 `renderVerificationReportMarkdown`，将重复的报告骨架交给共享 builder，领域专属的 attempt、evidence、decision、hardening 和 smoke 行仍留在各自的小 helper 中。

本版在改动前先运行旧实现并冻结 11 组 normalized length、SHA-256、H1/H2/H3 数量和结尾换行状态。迁移后同一测试逐项复算，11 组指纹全部一致。为保存旧报告中少数“相邻二级标题之间不插空行”的合同，builder 增加了默认不启用的 `headingLeadingBlankLine` 开关；已有调用者的默认输出不变，并有独立 builder 单测覆盖。

renderer census 从 245 个文件中的 231 个标准化、14 个未标准化，收紧到 242 个标准化、3 个未标准化。剩余三个文件均只组合两个下游 section renderer，不生成标题、字段或列表行，因此留给 v2184 以机械豁免方式正式收口。Java 和 mini-kv 不需要等待 Node，也没有被本版读写或启动。

本版没有可视化页面变化，因此不生成截图。证据以指纹测试、11 个原服务测试、census 负向门、类型检查、lint、build 和最终受控全量测试为准。
