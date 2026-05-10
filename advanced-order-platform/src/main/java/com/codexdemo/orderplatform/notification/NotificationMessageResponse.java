package com.codexdemo.orderplatform.notification;

import java.time.Instant;
import java.util.UUID;

public record NotificationMessageResponse(
        Long id,
        UUID eventId,
        String eventType,
        Long orderId,
        NotificationChannel channel,
        NotificationStatus status,
        String recipient,
        String subject,
        String content,
        Instant createdAt
) {

    static NotificationMessageResponse from(NotificationMessage message) {
        return new NotificationMessageResponse(
                message.getId(),
                message.getEventId(),
                message.getEventType(),
                message.getOrderId(),
                message.getChannel(),
                message.getStatus(),
                message.getRecipient(),
                message.getSubject(),
                message.getContent(),
                message.getCreatedAt()
        );
    }
}
