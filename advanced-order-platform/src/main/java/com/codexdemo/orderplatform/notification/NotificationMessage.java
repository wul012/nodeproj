package com.codexdemo.orderplatform.notification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "notification_messages",
        indexes = @Index(name = "idx_notification_messages_order_created", columnList = "order_id, created_at")
)
public class NotificationMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private UUID eventId;

    @Column(nullable = false, length = 80)
    private String eventType;

    @Column(nullable = false)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private NotificationChannel channel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private NotificationStatus status;

    @Column(nullable = false, length = 120)
    private String recipient;

    @Column(nullable = false, length = 160)
    private String subject;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false, columnDefinition = "text")
    private String payload;

    @Column(nullable = false)
    private Instant createdAt;

    protected NotificationMessage() {
    }

    private NotificationMessage(UUID eventId, String eventType, Long orderId, String recipient, String payload) {
        if (eventId == null) {
            throw new IllegalArgumentException("eventId is required");
        }
        if (eventType == null || eventType.isBlank()) {
            throw new IllegalArgumentException("eventType is required");
        }
        if (orderId == null) {
            throw new IllegalArgumentException("orderId is required");
        }
        if (recipient == null || recipient.isBlank()) {
            throw new IllegalArgumentException("recipient is required");
        }
        if (payload == null || payload.isBlank()) {
            throw new IllegalArgumentException("payload is required");
        }
        this.eventId = eventId;
        this.eventType = eventType;
        this.orderId = orderId;
        this.channel = NotificationChannel.IN_APP;
        this.status = NotificationStatus.READY;
        this.recipient = recipient;
        this.subject = "Order " + orderId + " created";
        this.content = "Order " + orderId + " has been created and is waiting for payment.";
        this.payload = payload;
        this.createdAt = Instant.now();
    }

    public static NotificationMessage orderCreated(UUID eventId, Long orderId, String payload) {
        return new NotificationMessage(eventId, "OrderCreated", orderId, "customer:" + orderId, payload);
    }

    public Long getId() {
        return id;
    }

    public UUID getEventId() {
        return eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public Long getOrderId() {
        return orderId;
    }

    public NotificationChannel getChannel() {
        return channel;
    }

    public NotificationStatus getStatus() {
        return status;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getSubject() {
        return subject;
    }

    public String getContent() {
        return content;
    }

    public String getPayload() {
        return payload;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
