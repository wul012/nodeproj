# 第二次讲解：商品目录和库存模块

第二次重点讲解这些文件：

```text
src/main/java/com/codexdemo/orderplatform/catalog/Product.java
src/main/java/com/codexdemo/orderplatform/catalog/ProductRepository.java
src/main/java/com/codexdemo/orderplatform/catalog/ProductResponse.java
src/main/java/com/codexdemo/orderplatform/catalog/CatalogService.java
src/main/java/com/codexdemo/orderplatform/catalog/CatalogController.java

src/main/java/com/codexdemo/orderplatform/inventory/InventoryItem.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryRepository.java
src/main/java/com/codexdemo/orderplatform/inventory/InventoryService.java
```

它们负责两个边界：

```text
catalog
 -> 商品是什么、多少钱、是否上架

inventory
 -> 商品还有多少可卖库存、已经预占多少库存
```

这两个模块合起来支撑一个基本问题：

```text
用户能不能买这个商品？
```

核心流程是：

```text
GET /api/v1/products
 -> CatalogController
 -> CatalogService
 -> ProductRepository 查询商品
 -> InventoryRepository 查询库存
 -> 组合成 ProductResponse 返回
```

下单时库存流程是：

```text
OrderApplicationService
 -> InventoryService.reserve
 -> InventoryRepository.findByProductIdForUpdate
 -> InventoryItem.reserve
 -> available 减少
 -> reserved 增加
```

---

# 1. `Product.java`：商品实体

`Product` 是商品表对应的 JPA 实体：

```java
@Entity
@Table(name = "products")
public class Product {
```

它对应数据库里的：

```text
products 表
```

主要字段是：

```text
id
 -> 商品主键

sku
 -> 商品编码，唯一

name
 -> 商品名称

price
 -> 商品单价

active
 -> 商品是否启用
```

`sku` 上有唯一约束：

```java
@Column(nullable = false, unique = true, length = 64)
private String sku;
```

这说明同一个商品编码不能重复。

`price` 使用 `BigDecimal`：

```java
@Column(nullable = false, precision = 12, scale = 2)
private BigDecimal price;
```

金额不要用 `double`，因为浮点数有精度误差。

比如：

```text
0.1 + 0.2
```

在浮点数里可能不是精确的 `0.3`。

所以 Java 里处理金额通常用：

```text
BigDecimal
```

创建商品的方法是：

```java
public static Product create(String sku, String name, BigDecimal price) {
    return new Product(sku, name, price);
}
```

这里没有直接暴露 public 构造器，而是用静态工厂方法创建。

一句话总结：`Product` 保存商品的基础信息，是下单时计算金额和展示商品列表的源头。

---

# 2. `ProductRepository.java`：商品数据库访问入口

代码很短：

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

但作用很大。

继承 `JpaRepository<Product, Long>` 后，Spring Data JPA 自动提供：

```text
findAll()
findById(id)
findAllById(ids)
save(product)
delete(product)
count()
```

所以在业务代码里可以直接写：

```java
productRepository.findAllById(quantities.keySet())
```

不需要自己写 SQL。

一句话总结：`ProductRepository` 是商品实体和数据库之间的桥。

---

# 3. `ProductResponse.java`：商品接口返回对象

`ProductResponse` 是一个 Java record：

```java
public record ProductResponse(
        Long id,
        String sku,
        String name,
        BigDecimal price,
        int availableStock
) {
}
```

它不是数据库实体，而是接口返回给前端或调用方的 JSON 结构。

为什么不直接返回 `Product`？

因为 `Product` 只知道商品基础信息，不知道库存。

商品列表接口希望返回：

```text
商品 ID
SKU
名称
价格
可用库存
```

所以需要一个专门的响应对象。

转换方法是：

```java
static ProductResponse from(Product product, int availableStock) {
    return new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getPrice(), availableStock);
}
```

一句话总结：`ProductResponse` 是给 HTTP API 用的展示模型，把商品信息和可用库存组合在一起。

---

# 4. `CatalogService.java`：组合商品和库存

`CatalogService` 的核心方法是：

```java
@Transactional(readOnly = true)
public List<ProductResponse> listProducts() {
```

`readOnly = true` 表示这个事务只读数据，不修改数据库。

先查所有库存：

```java
Map<Long, Integer> stocks = inventoryRepository.findAll().stream()
        .collect(Collectors.toMap(item -> item.getProductId(), item -> item.getAvailable()));
```

这一步把库存列表转成 Map：

```text
productId -> available
```

比如：

```text
1 -> 100
2 -> 40
3 -> 25
```

然后查所有商品：

```java
return productRepository.findAll().stream()
        .filter(Product::isActive)
        .map(product -> ProductResponse.from(product, stocks.getOrDefault(product.getId(), 0)))
        .toList();
```

这段逻辑做了三件事：

```text
过滤掉未启用商品
按商品 ID 找库存
组装 ProductResponse
```

如果某个商品没有库存记录：

```java
stocks.getOrDefault(product.getId(), 0)
```

就返回 `0`。

一句话总结：`CatalogService` 把商品表和库存表合并成商品列表接口需要的数据。

---

# 5. `CatalogController.java`：商品列表 HTTP 入口

Controller 映射路径是：

```java
@RequestMapping("/api/v1/products")
```

查询方法是：

```java
@GetMapping
public List<ProductResponse> listProducts() {
    return catalogService.listProducts();
}
```

所以调用：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/products
```

内部流程是：

```text
HTTP GET /api/v1/products
 -> CatalogController.listProducts
 -> CatalogService.listProducts
 -> ProductRepository + InventoryRepository
 -> 返回 JSON 数组
```

一句话总结：`CatalogController` 是商品查询能力暴露给外部的入口。

---

# 6. `InventoryItem.java`：库存实体

`InventoryItem` 对应数据库里的：

```text
inventory_items 表
```

它的关键字段是：

```text
productId
 -> 哪个商品的库存

available
 -> 还可以卖的库存

reserved
 -> 已经被订单预占，但还没有最终确认的库存

version
 -> JPA 乐观锁版本字段
```

这里最重要的是理解：

```text
available + reserved 不是随便变化的两个数
```

下单时：

```text
available 减少
reserved 增加
```

支付时：

```text
reserved 减少
```

也就是：

```text
创建订单
 -> 先把库存占住，防止别人继续买走

支付成功
 -> 预占库存变成真正卖出
```

`reserve` 方法：

```java
public void reserve(int quantity) {
    if (quantity <= 0) {
        throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_QUANTITY", "Quantity must be greater than zero");
    }
    if (available < quantity) {
        throw new BusinessException(HttpStatus.CONFLICT, "INSUFFICIENT_STOCK",
                "Product " + productId + " has only " + available + " units available");
    }
    available -= quantity;
    reserved += quantity;
}
```

它先校验数量必须大于 0。

然后校验库存够不够。

如果够：

```text
available -= quantity
reserved += quantity
```

`commitReserved` 方法：

```java
public void commitReserved(int quantity) {
    if (reserved < quantity) {
        throw new BusinessException(HttpStatus.CONFLICT, "RESERVATION_MISMATCH",
                "Product " + productId + " reservation is lower than requested commit quantity");
    }
    reserved -= quantity;
}
```

它表示确认扣减预占库存。

这里没有再减少 `available`，因为 `available` 在下单预占时已经减过了。

一句话总结：`InventoryItem` 把库存拆成 available 和 reserved，从而支持“先占库存，后确认支付”的订单流程。

---

# 7. `InventoryRepository.java`：库存锁定查询

普通查询是：

```java
Optional<InventoryItem> findByProductId(Long productId);
```

下单和支付时用的是：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("select item from InventoryItem item where item.productId = :productId")
Optional<InventoryItem> findByProductIdForUpdate(@Param("productId") Long productId);
```

这里的重点是：

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
```

意思是查这条库存记录时加写锁。

可以把它理解成数据库层面的：

```sql
select ... for update
```

为什么需要锁？

因为多个用户可能同时买同一个商品。

如果不加锁，可能出现：

```text
商品库存只有 1
用户 A 查到 available = 1
用户 B 也查到 available = 1
用户 A 下单成功
用户 B 也下单成功
最终卖出 2 件
```

加锁后流程变成：

```text
用户 A 锁住库存记录
用户 B 等待
用户 A 扣完库存并提交事务
用户 B 再读取最新库存
如果库存不够，用户 B 失败
```

一句话总结：`findByProductIdForUpdate` 是防止并发超卖的关键查询。

---

# 8. `InventoryService.java`：库存业务服务

`reserve` 方法：

```java
public void reserve(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> findLocked(entry.getKey()).reserve(entry.getValue()));
}
```

它接收的是：

```text
productId -> quantity
```

比如：

```text
1 -> 2
3 -> 1
```

然后按商品 ID 排序后逐个锁定库存：

```java
.sorted(Map.Entry.comparingByKey())
```

为什么排序？

因为如果一个订单里有多个商品，并发事务都按相同顺序加锁，可以降低死锁概率。

比如大家都按：

```text
productId 从小到大
```

加锁，就比 A 先锁 1 再锁 2、B 先锁 2 再锁 1 更安全。

`commitReserved` 和 `reserve` 类似：

```java
public void commitReserved(Map<Long, Integer> productQuantities) {
    productQuantities.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> findLocked(entry.getKey()).commitReserved(entry.getValue()));
}
```

支付时也要锁库存记录，避免同一订单重复支付或其他流程同时改库存。

一句话总结：`InventoryService` 是库存并发控制的门面，所有预占和确认扣减都从这里走。

---

# 本次讲解总结

第二次讲解的是商品和库存：`catalog` 负责展示商品，`inventory` 负责库存状态和并发锁，`available / reserved` 是订单系统里非常重要的库存设计。
