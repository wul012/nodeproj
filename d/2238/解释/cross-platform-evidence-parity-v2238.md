# v2238 说明：让历史证据报告真正跨平台

v2237 的本地验收并没有被直接当成最终结论。推送后的 Linux Node Evidence 在前十一项检查全部通过后，由三项 parity 断言揭示了两个隐藏在 Windows 工作树中的环境依赖。第一类依赖是 `resolvedPath`：读取工具为了找到 fixture 必须生成当前机器的绝对路径，但 profile 又把同一个绝对路径当成报告字段序列化。Windows 的 `D:\nodeproj\orderops-node` 与 GitHub runner 的 `/home/runner/work/nodeproj/nodeproj` 不仅根不同，反斜杠进入 JSON 后还需要转义，于是完全相同的证据内容生成了不同字节数。

第二类依赖位于 `src/services/manualConnectionSources.ts`。这个文件自己读取 Buffer、调用 stat 并计算摘要，没有复用 `src/services/historicalEvidenceReportUtils.ts` 已有的文本规范化逻辑。本机历史 fixture 中一份 Java 集成测试物理上混合了 3,865 个 CRLF 与 113 个 LF；Git clean filter 会把它们统一写入 LF blob，所以 git status 仍然干净，但 Linux checkout 只能得到规范 LF。旧 operator-window 摘要因此绑定了一个不可由提交重现的本机物理状态。

v2238 没有修改 fixture 来迁就旧摘要，也没有把 Linux 收到的字节直接塞回多个测试。`src/services/historicalEvidenceResolver.ts` 新增稳定报告路径：真实 I/O 仍使用 runner 本地路径，只有报告对象把仓库内 fallback 表示为既有 Windows 兼容别名。`src/services/historicalEvidenceReportUtils.ts` 使用这个表示生成 `resolvedPath`，所以 Java v106/v107 profile 在两种系统上都能保持已有完整字节合同。仓库外真实路径仍原样返回，不影响本地 sibling 诊断。

`manualConnectionSources.ts` 则删除重复的原始字节元数据代码，委托给已经有 LF、CRLF、BOM 与 mixed-line-ending 测试的共享工具，再投影回原来的五字段模型。这样 packet、preflight 与 operator 三个服务继续收到相同数据形状，不会突然多出 `resolvedPath`。operator-window 的旧 hash 被纠正为 Git 规范文本的摘要，并增加直接断言，证明 manual connection 调用链对 LF 与 mixed/BOM 输入给出相同 size 和 digest；这是加强 oracle，而不是放宽它。

本版没有新增路由、schema、profile 字段、fixture、waiver 或执行能力。Java 与 mini-kv 不需要提供新证据，也不会被 Node 启动。最终完成条件仍是同一 `v2238` commit 在远端通过 coverage、build 与安全 smoke；在此之前只能说 focused、typecheck 和 lint 已通过，不能宣布九分点。
