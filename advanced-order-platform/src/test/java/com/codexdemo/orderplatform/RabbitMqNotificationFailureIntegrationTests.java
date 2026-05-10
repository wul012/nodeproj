package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.codexdemo.orderplatform.notification.FailedEventMessage;
import com.codexdemo.orderplatform.notification.FailedEventMessageRepository;
import com.codexdemo.orderplatform.notification.FailedEventMessageResponse;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttempt;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptRepository;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptStatus;
import com.codexdemo.orderplatform.notification.FailedEventMessageService;
import com.codexdemo.orderplatform.notification.FailedEventMessageStatus;
import com.codexdemo.orderplatform.notification.NotificationMessage;
import com.codexdemo.orderplatform.notification.NotificationMessageRepository;
import com.codexdemo.orderplatform.notification.ReplayFailedEventRequest;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.web.server.ResponseStatusException;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:order-platform-failure-it;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1",
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false",
        "outbox.rabbitmq.enabled=true",
        "outbox.rabbitmq.exchange=order-platform.failure.test",
        "outbox.rabbitmq.queue=order-platform.failure.test",
        "outbox.rabbitmq.routing-key-prefix=orders",
        "outbox.rabbitmq.dead-letter-exchange=order-platform.failure.dlx",
        "outbox.rabbitmq.dead-letter-queue=order-platform.failure.dlq",
        "outbox.rabbitmq.dead-letter-routing-key=orders.failure",
        "notification.rabbitmq.enabled=true",
        "notification.rabbitmq.retry.max-attempts=3",
        "notification.rabbitmq.retry.initial-interval-ms=50",
        "notification.rabbitmq.retry.multiplier=1.1",
        "notification.rabbitmq.retry.max-interval-ms=50",
        "failed-event.replay.allowed-roles=ORDER_SUPPORT,SRE,SYSTEM"
})
class RabbitMqNotificationFailureIntegrationTests {

    private static final String RABBITMQ_USER = "order_app";

    private static final String RABBITMQ_PASSWORD = "order_app";

    private static final String OUTBOX_EXCHANGE = "order-platform.failure.test";

    private static final String OUTBOX_QUEUE = "order-platform.failure.test";

    private static final String DEAD_LETTER_QUEUE = "order-platform.failure.dlq";

    private static final String BAD_MESSAGE_ID = "v13-bad-order-created-message";

    private static final String REPLAY_EVENT_ID = "14141414-1414-1414-1414-141414141414";

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
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private FailedEventMessageRepository failedEventMessageRepository;

    @Autowired
    private FailedEventMessageService failedEventMessageService;

    @Autowired
    private FailedEventReplayAttemptRepository failedEventReplayAttemptRepository;

    @Autowired
    private NotificationMessageRepository notificationMessageRepository;

    @Autowired
    private RabbitListenerEndpointRegistry rabbitListenerEndpointRegistry;

    @AfterEach
    void stopRabbitListeners() {
        rabbitListenerEndpointRegistry.stop();
    }

    @Test
    void retriesMalformedOrderCreatedMessagesRecordsDeadLettersAndReplaysWithRepairedHeaders()
            throws InterruptedException {
        rabbitTemplate.convertAndSend(
                OUTBOX_EXCHANGE,
                "orders.OrderCreated",
                "{\"orderId\":404,\"status\":\"CREATED\"}",
                message -> {
                    message.getMessageProperties().setContentType("application/json");
                    message.getMessageProperties().setMessageId(BAD_MESSAGE_ID);
                    message.getMessageProperties().setHeader("aggregateType", "ORDER");
                    message.getMessageProperties().setHeader("aggregateId", "404");
                    message.getMessageProperties().setHeader("eventType", "OrderCreated");
                    return message;
                }
        );

        FailedEventMessage failedMessage = waitForFailedMessageCount(1).getFirst();

        assertThat(notificationMessageRepository.findAll()).isEmpty();
        assertThat(failedMessage.getMessageId()).isEqualTo(BAD_MESSAGE_ID);
        assertThat(failedMessage.getEventId()).isNull();
        assertThat(failedMessage.getEventType()).isEqualTo("OrderCreated");
        assertThat(failedMessage.getAggregateType()).isEqualTo("ORDER");
        assertThat(failedMessage.getAggregateId()).isEqualTo("404");
        assertThat(failedMessage.getSourceQueue()).isEqualTo(OUTBOX_QUEUE);
        assertThat(failedMessage.getDeadLetterQueue()).isEqualTo(DEAD_LETTER_QUEUE);
        assertThat(failedMessage.getFailureReason()).isNotBlank();
        assertThat(failedMessage.getPayload()).contains("\"orderId\":404");
        assertThat(failedMessage.getStatus()).isEqualTo(FailedEventMessageStatus.RECORDED);
        assertThat(failedMessage.getReplayCount()).isZero();
        assertThat(failedMessage.getLastReplayedAt()).isNull();

        ReplayFailedEventRequest replayRequest = new ReplayFailedEventRequest(
                REPLAY_EVENT_ID,
                null,
                null,
                null,
                null,
                "repair missing event id after DLQ verification"
        );
        assertThatThrownBy(() -> failedEventMessageService.replay(
                failedMessage.getId(),
                replayRequest,
                "qa-operator",
                "VIEWER"
        ))
                .isInstanceOfSatisfying(ResponseStatusException.class, ex ->
                        assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN)
                );
        assertThat(failedEventReplayAttemptRepository
                .findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(failedMessage.getId()))
                .isEmpty();

        FailedEventMessageResponse replayed = failedEventMessageService.replay(
                failedMessage.getId(),
                replayRequest,
                "qa-operator",
                "ORDER_SUPPORT"
        );
        NotificationMessage notification = waitForNotificationMessageCount(1).getFirst();
        FailedEventReplayAttempt replayAttempt = failedEventReplayAttemptRepository
                .findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(failedMessage.getId())
                .getFirst();

        assertThat(replayed.status()).isEqualTo(FailedEventMessageStatus.REPLAYED);
        assertThat(replayed.replayCount()).isEqualTo(1);
        assertThat(replayed.lastReplayEventId()).isEqualTo(REPLAY_EVENT_ID);
        assertThat(replayed.lastReplayedAt()).isNotNull();
        assertThat(replayed.lastReplayError()).isNull();
        assertThat(notification.getEventId()).isEqualTo(UUID.fromString(REPLAY_EVENT_ID));
        assertThat(notification.getEventType()).isEqualTo("OrderCreated");
        assertThat(notification.getOrderId()).isEqualTo(404L);
        assertThat(replayAttempt.getFailedEventMessage().getId()).isEqualTo(failedMessage.getId());
        assertThat(replayAttempt.getOperatorId()).isEqualTo("qa-operator");
        assertThat(replayAttempt.getOperatorRole()).isEqualTo("ORDER_SUPPORT");
        assertThat(replayAttempt.getReason()).isEqualTo("repair missing event id after DLQ verification");
        assertThat(replayAttempt.getRequestedEventId()).isEqualTo(REPLAY_EVENT_ID);
        assertThat(replayAttempt.getRequestedEventType()).isNull();
        assertThat(replayAttempt.getEffectiveEventId()).isEqualTo(REPLAY_EVENT_ID);
        assertThat(replayAttempt.getEffectiveEventType()).isEqualTo("OrderCreated");
        assertThat(replayAttempt.getEffectiveAggregateId()).isEqualTo("404");
        assertThat(replayAttempt.getEffectivePayload()).contains("\"orderId\":404");
        assertThat(replayAttempt.getStatus()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
        assertThat(replayAttempt.getErrorMessage()).isNull();
        assertThat(replayAttempt.getAttemptedAt()).isNotNull();
    }

    private List<FailedEventMessage> waitForFailedMessageCount(int expectedCount) throws InterruptedException {
        long deadline = System.currentTimeMillis() + 8000;
        List<FailedEventMessage> failedMessages;
        do {
            failedMessages = failedEventMessageRepository.findAll();
            if (failedMessages.size() == expectedCount) {
                return failedMessages;
            }
            Thread.sleep(100);
        } while (System.currentTimeMillis() < deadline);
        return failedMessages;
    }

    private List<NotificationMessage> waitForNotificationMessageCount(int expectedCount) throws InterruptedException {
        long deadline = System.currentTimeMillis() + 8000;
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
