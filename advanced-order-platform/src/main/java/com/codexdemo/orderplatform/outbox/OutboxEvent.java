package com.codexdemo.orderplatform.outbox;

import com.codexdemo.orderplatform.order.SalesOrder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "outbox_events")
public class OutboxEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 64)
    private String aggregateType;

    @Column(nullable = false, length = 64)
    private String aggregateId;

    @Column(nullable = false, length = 80)
    private String eventType;

    @Lob
    @Column(nullable = false)
    private String payload;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant publishedAt;

    protected OutboxEvent() {
    }

    private OutboxEvent(String aggregateType, String aggregateId, String eventType, String payload) {
        this.aggregateType = aggregateType;
        this.aggregateId = aggregateId;
        this.eventType = eventType;
        this.payload = payload;
        this.createdAt = Instant.now();
    }

    public static OutboxEvent orderCreated(SalesOrder order) {
        return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderCreated", orderPayload(order));
    }

    public static OutboxEvent orderPaid(SalesOrder order) {
        return new OutboxEvent("ORDER", String.valueOf(order.getId()), "OrderPaid", orderPayload(order));
    }

    private static String orderPayload(SalesOrder order) {
        return """
                {"orderId":%d,"customerId":"%s","status":"%s","totalAmount":%s}
                """.formatted(order.getId(), order.getCustomerId(), order.getStatus(), order.getTotalAmount()).trim();
    }

    public UUID getId() {
        return id;
    }

    public String getAggregateType() {
        return aggregateType;
    }

    public String getAggregateId() {
        return aggregateId;
    }

    public String getEventType() {
        return eventType;
    }

    public String getPayload() {
        return payload;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }
}
