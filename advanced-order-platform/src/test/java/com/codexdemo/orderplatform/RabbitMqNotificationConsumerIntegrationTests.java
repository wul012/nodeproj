package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.notification.NotificationMessage;
import com.codexdemo.orderplatform.notification.NotificationMessageRepository;
import com.codexdemo.orderplatform.order.CreateOrderLineRequest;
import com.codexdemo.orderplatform.order.CreateOrderRequest;
import com.codexdemo.orderplatform.order.CreateOrderResult;
import com.codexdemo.orderplatform.order.OrderApplicationService;
import com.codexdemo.orderplatform.outbox.OutboxEvent;
import com.codexdemo.orderplatform.outbox.OutboxPublisher;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:order-platform-notification-it;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1",
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false",
        "outbox.rabbitmq.enabled=true",
        "outbox.rabbitmq.exchange=order-platform.notification.test",
        "outbox.rabbitmq.queue=order-platform.notification.test",
        "outbox.rabbitmq.routing-key-prefix=orders",
        "notification.rabbitmq.enabled=true"
})
class RabbitMqNotificationConsumerIntegrationTests {

    private static final String RABBITMQ_USER = "order_app";

    private static final String RABBITMQ_PASSWORD = "order_app";

    private static final String OUTBOX_EXCHANGE = "order-platform.notification.test";

    @Container
    static final GenericContainer<?> RABBITMQ = new GenericContainer<>(
            DockerImageName.parse("rabbitmq:3.13-management-alpine"))
            .withExposedPorts(5672)
            .withEnv("RABBITMQ_DEFAULT_USER", RABBITMQ_USER)
            .withEnv("RABBITMQ_DEFAULT_PASS", RABBITMQ_PASSWORD)
            .waitingFor(Wait.forLogMessage(".*Server startup complete.*\\n", 1));

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
    private NotificationMessageRepository notificationMessageRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private RabbitListenerEndpointRegistry rabbitListenerEndpointRegistry;

    @AfterEach
    void stopRabbitListeners() {
        rabbitListenerEndpointRegistry.stop();
    }

    @Test
    void consumesOrderCreatedEventsAndStoresOneIdempotentNotification() throws InterruptedException {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("22222222-3333-4444-5555-666666666666"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("rabbitmq-consumer-v12-001", request);
        int published = outboxPublisher.publishPendingEvents();
        NotificationMessage firstNotification = waitForNotificationCount(1).getFirst();
        OutboxEvent event = outboxRepository.findTop50ByOrderByCreatedAtDesc().getFirst();

        rabbitTemplate.convertAndSend(
                OUTBOX_EXCHANGE,
                "orders.OrderCreated",
                event.getPayload(),
                message -> {
                    message.getMessageProperties().setContentType("application/json");
                    message.getMessageProperties().setMessageId(event.getId().toString());
                    message.getMessageProperties().setHeader("eventId", event.getId().toString());
                    message.getMessageProperties().setHeader("aggregateType", event.getAggregateType());
                    message.getMessageProperties().setHeader("aggregateId", event.getAggregateId());
                    message.getMessageProperties().setHeader("eventType", event.getEventType());
                    message.getMessageProperties().setHeader("createdAt", event.getCreatedAt().toString());
                    return message;
                }
        );
        Thread.sleep(1000);
        List<NotificationMessage> notificationsAfterDuplicate = notificationMessageRepository.findAll();

        assertThat(published).isEqualTo(1);
        assertThat(firstNotification.getEventId()).isEqualTo(event.getId());
        assertThat(firstNotification.getOrderId()).isEqualTo(created.order().id());
        assertThat(firstNotification.getEventType()).isEqualTo("OrderCreated");
        assertThat(firstNotification.getPayload()).contains("\"orderId\":" + created.order().id());
        assertThat(notificationsAfterDuplicate)
                .singleElement()
                .extracting(NotificationMessage::getId)
                .isEqualTo(firstNotification.getId());
    }

    private List<NotificationMessage> waitForNotificationCount(int expectedCount) throws InterruptedException {
        long deadline = System.currentTimeMillis() + 5000;
        List<NotificationMessage> notifications;
        do {
            notifications = notificationMessageRepository.findAll();
            if (notifications.size() == expectedCount) {
                return notifications;
            }
            Thread.sleep(100);
        } while (System.currentTimeMillis() < deadline);
        return notifications;
    }
}
