# 第九版讲解：库存变更流水

第九版重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/inventory/InventoryMovementType.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryMovement.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryMovementRepository.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryMovementResponse.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryController.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryService.java
src/test/java/com/codexdemo/orderplatform/OrderApplicationServiceTests.java
```

前面版本已经有三类流水或事件：

```text
order_status_history
 -> 解释订单状态怎么变

payment_transactions
 -> 解释支付和退款交易怎么发生

outbox_events
 -> 准备给外部系统发布领域事件
```

第九版补齐库存审计：

```text
inventory_movements
 -> 解释 available / reserved 是怎么变化的
```

---

# 1. 为什么需要库存流水

只看库存当前值，只能知道：

```text
available = 98
reserved = 0
```

但不知道它为什么变成这样。

库存流水能告诉你：

```text
RESERVE
 -> 下单预占，available 减少，reserved 增加

COMMIT_RESERVED
 -> 支付确认，reserved 减少

RELEASE_RESERVED
 -> 取消或过期，reserved 减少，available 增加

RETURN_COMMITTED
 -> 退款回补，available 增加
```

一句话总结：库存流水让库存数字从“当前结果”变成“可解释过程”。

---

# 2. `InventoryMovementType.java`：库存动作类型

枚举代码：

```java
public enum InventoryMovementType {
    RESERVE,
    COMMIT_RESERVED,
    RELEASE_RESERVED,
    RETURN_COMMITTED
}
```

四种类型对应四条业务链路：

```text
RESERVE
 -> createOrder 时预占库存

COMMIT_RESERVED
 -> pay 时确认扣减 reserved

RELEASE_RESERVED
 -> cancel / expire 时释放预占库存

RETURN_COMMITTED
 -> refund 时回补已扣减库存
```

一句话总结：`InventoryMovementType` 是库存流水的动作标签。

---

# 3. `InventoryMovement.java`：库存流水实体

实体定义：

```java
@Entity
@Table(
        name = "inventory_movements",
        indexes = @Index(name = "idx_inventory_movements_product_created", columnList = "product_id, created_at")
)
public class InventoryMovement {
```

它对应数据库表：

```text
inventory_movements
```

索引用的是：

```text
product_id, created_at
```

因为最常见查询是：

```text
查询某个商品的库存变化时间线
```

核心字段：

```java
@Column(name = "product_id", nullable = false)
private Long productId;

@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 40)
private InventoryMovementType type;

@Column(nullable = false)
private int quantity;

@Column(nullable = false)
private int availableBefore;

@Column(nullable = false)
private int reservedBefore;

@Column(nullable = false)
private int availableAfter;

@Column(nullable = false)
private int reservedAfter;

@Column(nullable = false)
private Instant createdAt;
```

这些字段能完整表达一次库存变化：

```text
哪个商品
做了什么动作
数量是多少
变化前 available/reserved 是多少
变化后 available/reserved 是多少
什么时候发生
```

创建流水的静态方法：

```java
public static InventoryMovement record(
        InventoryItem item,
        InventoryMovementType type,
        int quantity,
        int availableBefore,
        int reservedBefore
) {
    return new InventoryMovement(
            item.getProductId(),
            type,
            quantity,
            availableBefore,
            reservedBefore,
            item.getAvailable(),
            item.getReserved()
    );
}
```

这里 `after` 不由调用方传入，而是直接从 `InventoryItem` 读取：

```java
item.getAvailable()
item.getReserved()
```

这样能减少传错 after 值的风险。

一句话总结：`InventoryMovement` 保存一次库存变更的 before/after 快照。

---

# 4. `InventoryMovementRepository.java`：按商品查询流水

仓库接口：

```java
public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

    List<InventoryMovement> findByProductIdOrderByCreatedAtAscIdAsc(Long productId);
}
```

方法名含义：

```text
findByProductId
 -> 查询某个商品的流水

OrderByCreatedAtAsc
 -> 按时间从早到晚排序

IdAsc
 -> 时间相同时再按 id 排序，保证顺序稳定
```

一句话总结：`InventoryMovementRepository` 提供库存流水的数据库查询入口。

---

# 5. `InventoryMovementResponse.java`：库存流水响应 DTO

响应对象：

```java
public record InventoryMovementResponse(
        Long id,
        Long productId,
        InventoryMovementType type,
        int quantity,
        int availableBefore,
        int reservedBefore,
        int availableAfter,
        int reservedAfter,
        Instant createdAt
) {
```

转换方法：

```java
static InventoryMovementResponse from(InventoryMovement movement) {
    return new InventoryMovementResponse(
            movement.getId(),
            movement.getProductId(),
            movement.getType(),
            movement.getQuantity(),
            movement.getAvailableBefore(),
            movement.getReservedBefore(),
            movement.getAvailableAfter(),
            movement.getReservedAfter(),
            movement.getCreatedAt()
    );
}
```

为什么不直接返回实体？

```text
避免暴露 JPA Entity
保持 API 返回结构稳定
以后可以新增展示字段而不动实体
```

一句话总结：`InventoryMovementResponse` 是库存流水实体和 HTTP JSON 之间的隔离层。

---

# 6. `InventoryService.java`：统一写库存流水

第九版给库存服务新增依赖：

```java
private final InventoryMovementRepository inventoryMovementRepository;
```

构造器注入：

```java
public InventoryService(
        InventoryRepository inventoryRepository,
        InventoryMovementRepository inventoryMovementRepository
) {
    this.inventoryRepository = inventoryRepository;
    this.inventoryMovementRepository = inventoryMovementRepository;
}
```

核心方法是：

```java
private void applyAndRecord(
        Long productId,
        int quantity,
        InventoryMovementType type,
        Consumer<InventoryItem> operation
) {
    InventoryItem item = findLocked(productId);
    int availableBefore = item.getAvailable();
    int reservedBefore = item.getReserved();
    operation.accept(item);
    inventoryMovementRepository.save(InventoryMovement.record(
            item,
            type,
            quantity,
            availableBefore,
            reservedBefore
    ));
}
```

这段代码很关键。

它做了 5 件事：

```text
1. findLocked 拿库存行写锁
2. 记录 availableBefore / reservedBefore
3. 执行真正库存变更
4. 从 InventoryItem 读取 after 值
5. 保存 InventoryMovement
```

因为调用它的订单流程都在事务内，所以：

```text
库存变更和流水写入一起提交
中间失败就一起回滚
```

一句话总结：`applyAndRecord` 是第九版的核心，它把“改库存”和“记流水”绑在同一个锁和事务里。

---

# 7. 预占、确认、释放、回补如何写流水

下单预占：

```java
public void reserve(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> applyAndRecord(
                    entry.getKey(),
                    entry.getValue(),
                    InventoryMovementType.RESERVE,
                    item -> item.reserve(entry.getValue())
            ));
}
```

支付确认：

```java
public void commitReserved(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> applyAndRecord(
                    entry.getKey(),
                    entry.getValue(),
                    InventoryMovementType.COMMIT_RESERVED,
                    item -> item.commitReserved(entry.getValue())
            ));
}
```

退款回补：

```java
public void returnCommitted(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> applyAndRecord(
                    entry.getKey(),
                    entry.getValue(),
                    InventoryMovementType.RETURN_COMMITTED,
                    item -> item.returnCommitted(entry.getValue())
            ));
}
```

取消释放：

```java
public void releaseReserved(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> applyAndRecord(
                    entry.getKey(),
                    entry.getValue(),
                    InventoryMovementType.RELEASE_RESERVED,
                    item -> item.releaseReserved(entry.getValue())
            ));
}
```

共同点是：

```text
仍然按 productId 排序
仍然先拿行锁
每次真实库存变化都写流水
```

一句话总结：第九版没有改变库存业务规则，只是在每条规则后补上可审计记录。

---

# 8. `listProductMovements`：查询库存流水

服务方法：

```java
public List<InventoryMovementResponse> listProductMovements(Long productId) {
    findExisting(productId);
    return inventoryMovementRepository.findByProductIdOrderByCreatedAtAscIdAsc(productId).stream()
            .map(InventoryMovementResponse::from)
            .toList();
}
```

先调用：

```java
findExisting(productId);
```

目的是保持错误语义：

```text
库存不存在
 -> 404 INVENTORY_NOT_FOUND
```

然后按时间顺序返回流水。

一句话总结：库存流水查询先确认商品库存存在，再返回这个商品的完整库存变化轨迹。

---

# 9. `InventoryController.java`：库存流水 HTTP 接口

新增 Controller：

```java
@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {
```

查询接口：

```java
@GetMapping("/products/{productId}/movements")
public List<InventoryMovementResponse> listProductMovements(@PathVariable Long productId) {
    return inventoryService.listProductMovements(productId);
}
```

调用方式：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/inventory/products/1/movements
```

返回里会看到类似：

```text
RESERVE
COMMIT_RESERVED
RETURN_COMMITTED
```

一句话总结：`InventoryController` 把库存审计能力暴露为 HTTP 查询接口。

---

# 10. `OrderApplicationServiceTests.java`：测试库存流水

第九版新增测试：

```java
void inventoryMovementsTrackReserveCommitAndReturn()
```

它执行：

```text
创建订单
支付订单
退款订单
```

断言流水类型：

```java
assertThat(newMovements.stream().map(InventoryMovementResponse::type).toList())
        .containsExactly(
                InventoryMovementType.RESERVE,
                InventoryMovementType.COMMIT_RESERVED,
                InventoryMovementType.RETURN_COMMITTED
        );
```

再断言 before/after：

```java
assertThat(reserve.availableAfter()).isEqualTo(reserve.availableBefore() - 2);
assertThat(reserve.reservedAfter()).isEqualTo(reserve.reservedBefore() + 2);
assertThat(commit.availableAfter()).isEqualTo(commit.availableBefore());
assertThat(commit.reservedAfter()).isEqualTo(commit.reservedBefore() - 2);
assertThat(returned.availableAfter()).isEqualTo(returned.availableBefore() + 2);
assertThat(returned.reservedAfter()).isEqualTo(returned.reservedBefore());
```

取消测试也被增强：

```java
assertThat(inventoryService.listProductMovements(product.getId()).stream()
        .skip(movementCountBefore)
        .map(InventoryMovementResponse::type)
        .toList())
        .containsExactly(InventoryMovementType.RESERVE, InventoryMovementType.RELEASE_RESERVED);
```

一句话总结：第九版测试不仅看库存最终值，还看每一步库存变化是否留下正确流水。

---

# 11. 四类记录的区别

到第九版，项目里有四类“记录”：

```text
inventory_movements
payment_transactions
order_status_history
outbox_events
```

它们职责不同：

```text
inventory_movements
 -> 解释库存数量变化

payment_transactions
 -> 解释支付和退款交易

order_status_history
 -> 解释订单状态变化

outbox_events
 -> 准备发布领域事件
```

一次退款会同时写：

```text
inventory_movements
 -> RETURN_COMMITTED

payment_transactions
 -> REFUNDED

order_status_history
 -> ORDER_REFUNDED

outbox_events
 -> OrderRefunded
```

一句话总结：第九版让订单平台的四个关键侧面都具备可追踪记录。

---

# 本次讲解总结

第九版新增库存变更流水：`InventoryMovement` 保存库存 before/after，`InventoryService.applyAndRecord` 在同一个锁和事务里执行库存变更并写流水，`InventoryController` 暴露 `/api/v1/inventory/products/{productId}/movements` 查询接口，测试覆盖预占、确认扣减、退款回补和取消释放。至此，项目不仅能保证库存一致性，还能解释库存为什么会变成当前值。
