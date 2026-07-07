# v2181 说明：修复 renderer parity 的 notes digest 归一化

v2181 是 v2180 的 CI 修复版，不是功能版。v2180 已经把五个 sandbox handle review renderer 迁入 `renderVerificationReportMarkdown`，本地 focused、census、历史 migration 回归、文档门、typecheck、lint 和 build 都通过；但 GitHub Actions 在完整 `test:coverage` 的 Test 步骤里暴露了一个 Linux-runner-only hash 差异：`sandboxHandleReviewPrerequisiteIntake` 长度一致，SHA-256 不一致。

定位后确认差异来自测试比较面，而不是产品 renderer。第一个报告的 prerequisite input notes 中有一句 `The prerequisite intake is chained to <source decision digest>.`，这个 digest 来自上游 archive 内容。Windows checkout 的 CRLF 与 Linux checkout 的 LF 会让上游 digest 不同，但报告结构、字段标签、section 顺序、安全边界和业务判断没有变化。旧 normalizer 已经屏蔽了 `decisionDigest`、`sourceDecisionDigest` 等条目，却漏掉了 notes 里的自然语言 digest。

本版只扩展 `test/rendererMigrationParityUtils.ts`，把 `chained to <64位hex>` 折叠成 `chained to <digest>`，并更新 v2180 prerequisite-intake parity 的稳定指纹：normalized length 为 10535，SHA-256 为 `fa32926da5b8871891ab5a0a6fd4bebc21e886b968f3c9d03a5c1e442275d2c1`。其他四个 v2180 case 指纹保持不变。产品 renderer、loader、route、schema、fixture 和真实 Markdown 输出全部不变。

验证已完成：v2180 focused parity+census 通过，v2167/v2168/v2169/v2170/v2175/v2176/v2178/v2179/v2180 migration 回归通过，文档门通过，typecheck 通过，lint 仍为 0 errors / 263 existing warnings，build 通过。最终远端证据仍以 GitHub Actions 的 v2181 run 为准；通过后本轮按用户要求停下，不继续开 v2182。
