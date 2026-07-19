# v2205 说明：偿还两个最高价值维护热点

## 本版为何选择这两处

v2204 的机械扫描把 `src/routes/statusRoutes.ts` 与 `src/ui/dashboardMarkup.ts` 排在近线文件榜首，分别为 795 与 793 个物理行。前者仍承担 34 条已经自然成组的生产只读路由，主注册函数跨度达到 618 行；后者把状态、fixture、场景证据、审计和操作台标记放在同一个模板常量里。两处都有强回归支点，因此可以在不改变外部行为的前提下做高收益拆分。

路由侧先增加带请求头的 JSON/Markdown registrar，再把 17 条 real-read 路由和 17 条 release/approval 路由迁入两个独立注册函数。第一版把它们放进两个文件，完整回归随即被 `governanceGrowthRatchet` 拦下：直接路由文件从硬上限 80 增到 82。修复没有提高上限，而是把两个职责函数收进同一个 369 行的 `statusReportRoutes.ts`，并把只有十行的 Dashboard 注册壳并入状态入口导出。`app.ts` 的调用位置和路由顺序不变，直接路由文件回到 80。主文件继续把 core、CI、workflow、runtime/SSE 组织为短 helper，最终为 215 行，所有新增或触碰函数都低于 120 行。dashboard 侧完整抽出场景矩阵、验证、归档 bundle 与归档验证四个连续 section；主模板 531 行，片段 265 行。

## 机械证据

迁移前新增的 oracle 固定了 34 条 GET 路径、dashboard markup 的 38137 字符及 SHA-256 `9c5bd6...1925dc`，并固定完整 HTML 的 95724 字符及 SHA-256 `b2caa9...82197`。迁移后四项完全相同。旧基线先按设计报告两条大文件 stale，继续拆短主注册函数后又报告该函数 stale；最终刷新 diff 只删除这三个已偿还键，没有新增或增长条目。当前 census 为 89 个近线文件、121 个长函数、238 个高分支函数和 2 个运行时循环，状态 ready。

最终树按 16 个低并发分片完成了全部 567 个测试文件、1726 个用例，`vitest list` 独立复核得到相同总数。一次双分片单 worker 执行只发生超时、没有断言失败；最慢文件单独 4/4 通过，相关第 6 片改用同样总计两个 worker 后 118/118 通过，因此没有调整测试期望或业务代码。build、typecheck、零警告 lint、维护性、优雅、family、源码体积、renderer、安全配置和归档保留门全部通过。受工具托管的本地进程在 31205 端口完成 6/6 HTTP smoke，覆盖 health、metrics、runtime config、迁移路由 JSON/Markdown 与 Dashboard，随后进程和端口均已关闭。

Playwright 桌面全页渲染通过，截图保存在 `d/2205/图片/dashboard-v2205-desktop.png`。移动快照同时发现少数长审计按钮超过 302px 内容列，控制台还报告 `/favicon.ico` 404；源码检查发现完整 HTML 中存在迁移前就有的重复文档外壳标签。v2205 的职责是逐字节迁移，因此没有把这些有意行为修复偷偷混入摘要基线，而是将它们明确交给独立的后续页面壳维护版。本版没有修改 API 路径、JSON/Markdown renderer、fixture、跨项目证据或生产权限；Java 与 mini-kv 不需要等待 Node，也不触发 live capstone。
