# v2182 说明：修复 closure review evidence digest 归一化

v2182 是 v2181 的 CI 修复后续版，不是功能版。v2181 修复了 prerequisite-intake notes 里的 `chained to <digest>` 漂移，但新的 GitHub Actions run `28877491126` 又在同一个 v2180 parity 文件的第五个 case 上暴露了第二个自然语言 digest 漏点：`sandboxHandleReviewPrerequisiteClosureReview` 长度一致、SHA-256 不一致。

定位后确认差异来自 closure review 的 completed item evidence 句子：`Node v361 verified archive <archive digest> for decision <decision digest>.` 这两个 digest 都来自上游 archive / decision 内容，Windows CRLF 与 Linux LF checkout 会让派生值不同，但 renderer 的 section、字段、状态、安全边界和业务文本没有变化。v2182 只把这个句式的两个 digest 折叠成 `<digest>`，真实 Markdown 输出保持完整 digest。

更新后的 closure review normalized fingerprint 为 length 7815、SHA-256 `6b4bd57cbfde80470b02a3bd12cfbf14d70c91eee2418533ab54ae12e5ac2010`，H1/H2/H3 仍为 1/10/0。其他四个 v2180 parity case 指纹保持不变。最终远端证据仍以 v2182 GitHub Actions run 为准；如果通过，本轮按用户要求停下。
