# Node v2223 归档说明

## 改造目标

本版建立项目内 JSON 证据读取的单一安全边界，并迁移 operator service lifecycle 与 declared
lifecycle 两个 intake。旧实现各自复制文件存在判断、路径拼接、BOM 去除、JSON 解析、深层取值、
字符串与有限数值收窄、集合包含和摘要校验，共删除十四个重复 helper。新
`src/evidence/projectJson.ts` 只有 56 行，不理解 Node/Java/mini-kv 版本、路由、readiness 或
blocker；两份领域服务继续拥有字段映射与安全判定，数据读取和业务行为没有混成万能框架。

## 失败关闭机理

读取器只接受 JSON object root。缺文件、非法 JSON、数组、null、布尔或数字 root 均返回 null；
深路径遇到非对象立即返回 undefined；数值必须有限，字符串数组只保留真实字符串，SHA-256 只
接受 64 位小写十六进制。UTF-8 BOM 复用既有 `parseJsonEvidence`，没有再复制第三个 parser。
focused test 覆盖 BOM、非法文本、五类非对象 root、缺文件、数组中间节点、Infinity、错类型、
集合缺项和 digest 大小写/长度，证明安全默认值由机械测试而不是调用者约定维持。

## 行为等价证据

固定 `generatedAt=2026-07-21T00:00:00.000Z` 后，源码改动前后共复核本地与强制 historical
fallback 两种模式。service lifecycle JSON/Markdown 始终为 15,922/13,748 字节，SHA-256
分别为 `979c9b8f...168ff` 与 `ff34aaa9...80c9`；declared lifecycle 始终为
15,237/13,047 字节，SHA-256 分别为 `23009992...164ff` 与 `7155bae7...4100`。八个长度与
摘要全部相等，测试期望和 fixture 均未修改。

两份服务从 589/554 行下降为 551/516 行。维护性基线仍为 83/98/217/0，因为本版删除的是
短重复 helper，下一版才拆 178 行复杂 checks；elegance name debt 保持 4,537，说明新增模块和
API 没有产生新的超长名字。`projectJson` 形成阈值以下的单成员局部 family，受管 family 仍为
52，未放宽任何 ratchet。

## CI runtime 维护

工作流把 `actions/checkout` 与 `actions/setup-node` 从 v4 更新到官方 v7，项目运行时仍明确固定
Node 22，npm cache、只读 permissions、触发路径、测试、build 和 smoke 步骤不变。这个改动只
消除 action 自身旧 Node runtime 的弃用面，不把依赖版本升级混进业务重构。最终行为由本批次末
远端 Node Evidence CI 统一验证。

## 验证与边界

定向 typecheck、零警告 lint 和含讲解质量门的 4 文件 16 项测试通过；讲解含 3,230 个中文字符与
13 个可扫描章节。security、archive retention、elegance、
family、maintainability、renderer 与 source-size 七项静态门全部通过。Node 没有读取新鲜兄弟
项目状态，没有改 Java/mini-kv 工作树，也没有增加网络、写入、服务启动、凭据读取或执行权限。
本版没有 HTML/UI 变化，截图不能为读取内核提供额外证明，因此按证据经济规则不创建图片目录。
