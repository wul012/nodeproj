# 第一次讲解：项目入口、依赖和配置

第一次重点讲解这些文件：

```text
pom.xml
src/main/java/com/codexdemo/orderplatform/OrderPlatformApplication.java
src/main/java/com/codexdemo/orderplatform/DemoDataInitializer.java
src/main/resources/application.yml
src/main/resources/application-postgres.yml
compose.yaml
```

它们不直接负责“下单”这个业务动作，但负责把整个项目跑起来。

可以把这一层理解成：

```text
项目启动底座
 -> Maven 下载依赖并打包
 -> Spring Boot 扫描组件
 -> application.yml 提供默认运行配置
 -> DemoDataInitializer 准备演示数据
 -> compose.yaml 预留真实中间件
```

---

# 1. `pom.xml`：告诉 Maven 这是一个 Spring Boot 项目

`pom.xml` 的第一层角色是：

```text
定义项目坐标
定义 Java 版本
定义依赖
定义打包插件
```

这里最关键的是父工程：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.9</version>
    <relativePath/>
</parent>
```

这表示项目使用 Spring Boot 3.5.9 的依赖管理。

有了这个父工程，很多依赖不需要手动写版本号，比如：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Maven 会根据 Spring Boot 版本自动选一组兼容的 Spring MVC、Jackson、Tomcat 等依赖。

项目使用 Java 21：

```xml
<java.version>21</java.version>
```

这说明编译目标是 Java 21。当前机器上 Maven 也是用 JDK 21 跑的，所以这个选择比较稳。

## 主要 starter

```text
spring-boot-starter-web
 -> 提供 HTTP API、Controller、JSON 序列化、内置 Tomcat

spring-boot-starter-data-jpa
 -> 提供 JPA、Hibernate、Repository、事务整合

spring-boot-starter-validation
 -> 提供 @NotNull、@NotEmpty、@Positive 等参数校验

spring-boot-starter-actuator
 -> 提供 /actuator/health、/actuator/metrics 等运维接口

spring-boot-starter-test
 -> 提供 JUnit 5、AssertJ、SpringBootTest 等测试能力
```

## 数据库依赖

```text
H2
 -> 默认本地内存数据库，方便快速启动和测试

PostgreSQL
 -> 后续接真实数据库时使用
```

这是一种适合练习项目的组合：

```text
刚开始用 H2 快速跑通
后面用 PostgreSQL 训练真实数据库建模和 SQL 优化
```

一句话总结：`pom.xml` 把这个项目定义成一个 Spring Boot Web + JPA + Validation + Actuator 的后端服务。

---

# 2. `OrderPlatformApplication.java`：Spring Boot 启动入口

入口类很短：

```java
@SpringBootApplication
public class OrderPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderPlatformApplication.class, args);
    }
}
```

这里最重要的是：

```java
@SpringBootApplication
```

它相当于组合了几件事：

```text
@Configuration
 -> 当前类可以提供配置

@EnableAutoConfiguration
 -> Spring Boot 根据依赖自动配置 Web、JPA、数据源、事务等

@ComponentScan
 -> 扫描当前包和子包里的 @Component、@Service、@Repository、@Controller
```

因为入口类在：

```text
com.codexdemo.orderplatform
```

所以 Spring 会扫描它下面的这些包：

```text
catalog
inventory
order
outbox
common
```

这就是为什么 `CatalogController`、`InventoryService`、`OrderApplicationService` 等类不用手动注册，Spring 也能找到它们。

一句话总结：`OrderPlatformApplication` 是整个应用的启动按钮，按下后 Spring Boot 会把项目里的组件都装配起来。

---

# 3. `application.yml`：默认本地运行配置

默认配置里最重要的是数据源：

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:order-platform;MODE=PostgreSQL;DATABASE_TO_UPPER=false;DB_CLOSE_DELAY=-1
    username: sa
    password:
    driver-class-name: org.h2.Driver
```

这里用的是 H2 内存数据库。

含义是：

```text
jdbc:h2:mem:order-platform
 -> 数据库在内存里，应用停止后数据消失

MODE=PostgreSQL
 -> 尽量模拟 PostgreSQL 的 SQL 行为

DATABASE_TO_UPPER=false
 -> 不强制把表名列名转成大写

DB_CLOSE_DELAY=-1
 -> JVM 运行期间保持数据库不关闭
```

JPA 配置是：

```yaml
jpa:
  hibernate:
    ddl-auto: update
  open-in-view: false
```

`ddl-auto: update` 表示 Hibernate 会根据实体类自动维护表结构。

这对练手项目很方便，因为你新增实体字段后不用先手写 SQL 建表。

`open-in-view: false` 表示关闭 Open Session In View。

这样可以逼着业务代码在事务范围内把需要的数据准备好，避免 Controller 返回 JSON 时才懒加载数据库。

Actuator 配置是：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

这会暴露：

```text
/actuator/health
/actuator/info
/actuator/metrics
```

其中最常用的是健康检查：

```powershell
Invoke-RestMethod http://localhost:8080/actuator/health
```

一句话总结：`application.yml` 让项目不依赖外部数据库也能直接跑起来，并且预先打开了健康检查接口。

---

# 4. `application-postgres.yml`：切换真实数据库的配置

这个文件用于以后切换 PostgreSQL：

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/order_platform}
    username: ${DB_USERNAME:order_app}
    password: ${DB_PASSWORD:order_app}
    driver-class-name: org.postgresql.Driver
```

`${DB_URL:...}` 的意思是：

```text
如果环境变量 DB_URL 存在，就用环境变量
如果不存在，就用冒号后面的默认值
```

启动时可以这样启用：

```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

或者打包后：

```powershell
java -jar target/advanced-order-platform-0.1.0-SNAPSHOT.jar --spring.profiles.active=postgres
```

一句话总结：`application-postgres.yml` 是从练习环境走向真实数据库环境的切换开关。

---

# 5. `DemoDataInitializer.java`：启动后准备演示商品和库存

这个类实现了：

```java
ApplicationRunner
```

所以应用启动完成后，会自动执行：

```java
public void run(ApplicationArguments args)
```

核心判断是：

```java
if (productRepository.count() > 0) {
    return;
}
```

这表示如果数据库里已经有商品，就不重复插入。

然后创建 3 个商品：

```java
Product keyboard = productRepository.save(Product.create("SKU-KEYBOARD-001", "Mechanical Keyboard", new BigDecimal("499.00")));
Product monitor = productRepository.save(Product.create("SKU-MONITOR-002", "27 Inch Monitor", new BigDecimal("1399.00")));
Product headphones = productRepository.save(Product.create("SKU-HEADSET-003", "Noise Cancelling Headphones", new BigDecimal("899.00")));
```

再给它们创建库存：

```java
inventoryRepository.save(InventoryItem.create(keyboard.getId(), 100));
inventoryRepository.save(InventoryItem.create(monitor.getId(), 40));
inventoryRepository.save(InventoryItem.create(headphones.getId(), 25));
```

这里要注意顺序：

```text
先保存 Product
 -> 拿到 productId
 -> 再保存 InventoryItem
```

因为库存表里保存的是商品 ID。

一句话总结：`DemoDataInitializer` 让你一启动项目就有可查询、可下单的商品，不需要手动插库。

---

# 6. `compose.yaml`：预留 PostgreSQL 和 Redis

`compose.yaml` 现在定义了两个服务：

```text
postgres
redis
```

PostgreSQL 用来替换默认 H2：

```yaml
postgres:
  image: postgres:16-alpine
  environment:
    POSTGRES_DB: order_platform
    POSTGRES_USER: order_app
    POSTGRES_PASSWORD: order_app
```

Redis 当前还没接入业务代码，但已经预留：

```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

后续可以用 Redis 练：

```text
商品缓存
热点库存缓存
分布式锁
接口限流
幂等 token
```

一句话总结：`compose.yaml` 说明这个项目不是只停留在 H2 玩具环境，而是已经给数据库和缓存升级留了口子。

---

# 本次讲解总结

第一次讲解的是项目底座：`pom.xml` 决定项目能力，入口类负责启动 Spring，配置文件负责数据库和运维接口，初始化器负责演示数据，`compose.yaml` 负责后续中间件升级。
