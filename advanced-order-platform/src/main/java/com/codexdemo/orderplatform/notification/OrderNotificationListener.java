package com.codexdemo.orderplatform.notification;

import java.nio.charset.StandardCharsets;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "notification.rabbitmq", name = "enabled", havingValue = "true")
public class OrderNotificationListener {

    private static final Logger log = LoggerFactory.getLogger(OrderNotificationListener.class);

    private final NotificationService notificationService;

    public OrderNotificationListener(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @RabbitListener(
            queues = "${outbox.rabbitmq.queue}",
            containerFactory = "notificationRabbitListenerContainerFactory"
    )
    public void handle(Message message) {
        String eventType = headerAsString(message, "eventType");
        if (!"OrderCreated".equals(eventType)) {
            log.debug("event=notification_ignored eventType={}", eventType);
            return;
        }

        UUID eventId = UUID.fromString(headerAsString(message, "eventId"));
        Long orderId = Long.valueOf(headerAsString(message, "aggregateId"));
        String payload = new String(message.getBody(), StandardCharsets.UTF_8);
        NotificationMessage notification = notificationService.recordOrderCreated(eventId, orderId, payload);
        log.info(
                "event=notification_recorded notificationId={} eventId={} orderId={}",
                notification.getId(),
                eventId,
                orderId
        );
    }

    private String headerAsString(Message message, String name) {
        Object value = message.getMessageProperties().getHeaders().get(name);
        if (value == null) {
            throw new IllegalArgumentException("missing message header: " + name);
        }
        return value.toString();
    }
}
