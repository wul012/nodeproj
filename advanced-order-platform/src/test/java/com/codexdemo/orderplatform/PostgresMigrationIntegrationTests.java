package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.inventory.InventoryMovementResponse;
import com.codexdemo.orderplatform.inventory.InventoryMovementType;
import com.codexdemo.orderplatform.inventory.InventoryService;
import com.codexdemo.orderplatform.order.CreateOrderLineRequest;
import com.codexdemo.orderplatform.order.CreateOrderRequest;
import com.codexdemo.orderplatform.order.CreateOrderResult;
import com.codexdemo.orderplatform.order.OrderApplicationService;
import com.codexdemo.orderplatform.order.OrderStatus;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest(properties = {
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false",
        "spring.jpa.hibernate.ddl-auto=validate",
        "spring.flyway.locations=classpath:db/migration/{vendor}"
})
class PostgresMigrationIntegrationTests {

    @Container
    static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>(
            DockerImageName.parse("postgres:16-alpine"))
            .withDatabaseName("order_platform_test")
            .withUsername("order_app")
            .withPassword("order_app");

    @DynamicPropertySource
    static void registerPostgresProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderApplicationService orderApplicationService;

    @Autowired
    private InventoryService inventoryService;

    @Test
    void flywayMigratesPostgresAndOrderFlowWritesInventoryMovements() {
        Integer appliedMigrations = jdbcTemplate.queryForObject(
                "select count(*) from flyway_schema_history where success = true",
                Integer.class
        );
        Integer tableCount = jdbcTemplate.queryForObject(
                """
                        select count(*)
                        from information_schema.tables
                        where table_schema = 'public'
                          and table_name in (
                              'products',
                              'inventory_items',
                              'orders',
                              'order_lines',
                              'order_status_history',
                              'payment_transactions',
                              'outbox_events',
                              'inventory_movements',
                              'notification_messages',
                              'failed_event_messages',
                              'failed_event_replay_attempts',
                              'failed_event_management_history'
                          )
                        """,
                Integer.class
        );
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("10101010-1010-1010-1010-101010101010"),
                List.of(new CreateOrderLineRequest(product.getId(), 2))
        );

        CreateOrderResult created = orderApplicationService.createOrder("postgres-it-v10-001", request);
        orderApplicationService.pay(created.order().id());
        var refunded = orderApplicationService.refund(created.order().id());
        List<InventoryMovementResponse> movements = inventoryService.listProductMovements(product.getId());

        assertThat(appliedMigrations).isEqualTo(9);
        assertThat(tableCount).isEqualTo(12);
        assertThat(refunded.status()).isEqualTo(OrderStatus.REFUNDED);
        assertThat(movements.stream().map(InventoryMovementResponse::type).toList())
                .containsExactly(
                        InventoryMovementType.RESERVE,
                        InventoryMovementType.COMMIT_RESERVED,
                        InventoryMovementType.RETURN_COMMITTED
                );
    }
}
