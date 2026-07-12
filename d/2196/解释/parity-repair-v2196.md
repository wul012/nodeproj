# v2196 跨 checkout 字节等价修复说明

## 失败边界

v2195 的生产改名、本地全量测试和四响应旧/新对比均通过。GitHub run 29180385904 也通过
typecheck、lint、安全、归档与 elegance 门，并通过 558 个测试文件、1702 项测试；唯一失败是
新增 parity oracle。四个响应长度完全不变，但摘要与当前 Windows 工作树不同。

## 根因与修复

归档证明会把历史文件的原始 byteLength 与 SHA-256 写入响应。Git blob、当前混合换行工作树、
Windows CRLF checkout 会形成三套不同输入。旧测试只固定了一套输入，却把结果误当作跨环境常量。

修复后先从两个 JSON profile 中收集所有 digest/Digest 与 byteLength，共 104 个排序信号，计算
证据指纹，再选择该指纹对应的 v2194 四响应完整摘要。三套表均通过隔离 worktree 的 v2194 与
v2195 双跑获得；未知指纹直接抛错。没有按平台跳过，也没有接受任意响应哈希。

本版不修改生产代码、路由、fixture、归档文件或业务断言，不规范化生产摘要，也不重写历史换行。
没有 UI 或 HTML 功能变化，因此不创建截图目录。

## 最终验证

- 当前混合、Linux/Git blob、Windows CRLF 三种 checkout focused 均为 1 文件、2 测试通过。
- 可读性修复 focused：3 文件、5 测试通过；讲解 3572 个中文字符且 required shape 合规。
- final full Vitest：559 文件、1704 测试通过，最多 6 worker，690.00 秒。
- typecheck、build 通过；lint 0 error / 261 warning。
- elegance 4562 ready；security 8194 文件、6/6 窄 waiver、18/18 配置检查。
- renderer 242/3/0；source-size 0；archive 7049 文件、62.74 MiB / 80 MiB。
- 本地 HTTP health 与四个目标表面均为 200；PID 11208 已停止，端口 31196 已关闭。

机器证据见 `d/2196/evidence/parity-repair-v2196-summary.json`。
