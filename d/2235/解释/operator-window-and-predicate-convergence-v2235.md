# v2235 operator window 与 predicate convergence 说明

本版把 operator-window evidence verification 的 Markdown 表达接入既有 manual-connection renderer，并复用只读历史 sources 与静态 advisories。迁移前 forced historical fallback 输出为 17,955 字节，SHA-256 为 `093bb3ba...8fe23f`；迁移后 exact match。

同时把 163 行 catalog quality loader 拆成 catalog scope、source projection、checks、summary 与 response assembly。固定时间下完整 profile 仍为 5,947 字节，JSON SHA-256 `0aee7c29...6fe19f`，quality digest `c7cf6c8b...03a5be74`。

mini-kv v97/v102 receipt 使用既有 `mapReceiptFields` 数据映射；长 `&&` 改为具名 predicate groups。五个复杂函数退出账本且没有 replacement growth。维护指标从 71/72/193/0 降至 70/71/188/0，最大函数 163→158，verification logic 980→898，operator 服务 754→582 行，name debt 保持 4,444。

相关 focused、typecheck、零告警 lint、elegance、family 与 maintainability 门通过。route、profile、完整 JSON/Markdown、fixture、权限、网络和 no-write 边界不变。本版无 UI，截图不适用；Java 与 mini-kv 可继续并行。
