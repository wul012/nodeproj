# Node v2212 归档说明

v2212 解决的不是一处表面上的 import 排版问题，而是两个真实存在的运行时依赖环。旧版从质量报告服务反向读取路由注册数组，又由路由注册模块加载这些报告服务；当入口恰好从质量路由模块开始导入时，ESM 在数组初始化前访问绑定，直接抛出 `ReferenceError`。另一个环位于 cleanup handoff 的归档验证链，虽然常规应用启动顺序没有触发异常，但同样让服务事实依赖注册实现，扩大了初始化顺序的影响范围。

本版新增 `src/contracts/auditRouteManifest.ts`，只声明六条质量路由路径和 cleanup handoff 的稳定数量。路由注册模块消费路径，报告服务消费路径或数量，依赖方向统一指向中立契约层。新测试再把清单与真实注册数组逐项比较，因此清单不是无人校验的第二份真相：路径顺序不同、路径重复、漏注册、增注册却不更新数量，都会机械失败。

输入保持为原有配置、归档文件和路由注册；输出保持为原有六条质量路由、三十条 cleanup handoff 路由以及两份报告中的 catalog 投影。v2211 直接导入质量路由会在 `auditJsonMarkdownRouteGroups.ts:68` 触发 ESM temporal dead zone，v2212 同一入口稳定输出 `quality=6`、`cleanup=30`。六个相关测试文件共十一项测试通过，typecheck、focused lint 和 maintainability census 通过，维护性账本从 85/112/228/2 收紧到 85/112/228/0，没有新增或增长项。

验证过程中曾尝试冻结两份完整报告的哈希，但字段级对比证明该做法把无关输入混入了契约：readability 报告包含文档原始字节数，临时 worktree 的 CRLF 会改变这些数字；cleanup 报告递归校验归档字节，同一换行差异会把 16/16 变成 14/16。路由投影本身前后完全一致。因此最终门冻结真正由本次依赖倒置影响的路径、顺序、唯一性、数量和报告投影，不接受把平台换行噪声写成新 expected 值。

本版没有增加路由或 service 文件，没有修改 handler、schema、fixture、报告安全判定、身份要求或执行权限，也没有启动 Java、mini-kv 或 live capstone。Java 与 mini-kv 可继续独立并行，Node 不构成其批准前置。改动不包含 HTML/UI，故无可验证的浏览器视觉表面，不生成截图。完整 suite、build、HTTP smoke、push 与远端 Node Evidence 按批次策略留到 v2214 后统一执行。
