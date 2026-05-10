package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.order.CreateOrderLineRequest;
import com.codexdemo.orderplatform.order.CreateOrderRequest;
import com.codexdemo.orderplatform.order.CreateOrderResult;
import com.codexdemo.orderplatform.order.OrderApplicationService;
import com.codexdemo.orderplatform.outbox.OutboxEvent;
import com.codexdemo.orderplatform.outbox.OutboxPublisher;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:order-platform-rabbit-it;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1",
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false",
        "outbox.rabbitmq.enabled=true",
        "outbox.rabbitmq.exchange=order-platform.outbox.test",
        "outbox.rabbitmq.queue=order-platform.outbox.test",
        "outbox.rabbitmq.routing-key-prefix=orders"
})
class RabbitMqOutboxPublisherIntegrationTests {

    private static final String RABBITMQ_USER = "order_app";

    private static final String RABBITMQ_PASSWORD = "order_app";

    private static final String OUTBOX_QUEUE = "order-platform.outbox.test";

    @Container
    static final GenericContainer<?> RABBITMQ = new GenericContainer<>(
            DockerImageName.parse("rabbitmq:3.13-management-alpine"))
            .withExposedPorts(5672)
            .withEnv("RABBITMQ_DEFAULT_USER", RABBITMQ_USER)
            .withEnv("RABBITMQ_DEFAULT_PASS", RABBITMQ_PASSWORD);

    @DynamicPropertySource
    static void registerRabbitMqProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.rabbitmq.host", RABBITMQ::getHost);
        registry.add("spring.rabbitmq.port", () -> RABBITMQ.getMappedPort(5672));
        registry.add("spring.rabbitmq.username", () -> RABBITMQ_USER);
        registry.add("spring.rabbitmq.password", () -> RABBITMQ_PASSWORD);
    }

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderApplicationService orderApplicationService;

    @Autowired
    private OutboxPublisher outboxPublisher;

    @Autowired
    private OutboxRepository outboxRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    void publishesPendingOutboxEventsToRabbitMqAndMarksThemPublished() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("11111111-2222-3333-4444-555555555555"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("rabbitmq-it-v11-001", request);
        long pendingBeforePublish = outboxRepository.countByPublishedAtIsNull();
        int published = outboxPublisher.publishPendingEvents();
        long pendingAfterPublish = outboxRepository.countByPublishedAtIsNull();
        Message message = rabbitTemplate.receive(OUTBOX_QUEUE, 5000);
        List<OutboxEvent> events = outboxRepository.findTop50ByOrderByCreatedAtDesc();

        assertThat(pendingBeforePublish).isEqualTo(1);
        assertThat(published).isEqualTo(1);
        assertThat(pendingAfterPublish).isZero();
        assertThat(message).isNotNull();
        assertThat(new String(message.getBody(), StandardCharsets.UTF_8))
                .contains("\"orderId\":" + created.order().id())
                .contains("\"status\":\"CREATED\"");
        assertThat(message.getMessageProperties().getMessageId()).isEqualTo(events.getFirst().getId().toString());
        assertThat(message.getMessageProperties().getReceivedRoutingKey()).isEqualTo("orders.OrderCreated");
        assertThat(message.getMessageProperties().getHeaders())
                .containsEntry("eventType", "OrderCreated")
                .containsEntry("aggregateType", "ORDER")
                .containsEntry("aggregateId", String.valueOf(created.order().id()));
        assertThat(events).allMatch(event -> event.getPublishedAt() != null);
    }
}
