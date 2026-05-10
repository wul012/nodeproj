package com.codexdemo.orderplatform.order;

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

@Entity
@Table(
        name = "order_status_history",
        indexes = @Index(name = "idx_order_status_history_order_changed", columnList = "order_id, changed_at")
)
public class OrderStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "from_status", length = 32)
    private OrderStatus fromStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "to_status", nullable = false, length = 32)
    private OrderStatus toStatus;

    @Column(nullable = false, length = 80)
    private String action;

    @Column(name = "changed_at", nullable = false)
    private Instant changedAt;

    protected OrderStatusHistory() {
    }

    private OrderStatusHistory(Long orderId, OrderStatus fromStatus, OrderStatus toStatus, String action) {
        if (orderId == null) {
            throw new IllegalArgumentException("orderId is required");
        }
        if (toStatus == null) {
            throw new IllegalArgumentException("toStatus is required");
        }
        if (action == null || action.isBlank()) {
            throw new IllegalArgumentException("action is required");
        }
        this.orderId = orderId;
        this.fromStatus = fromStatus;
        this.toStatus = toStatus;
        this.action = action;
        this.changedAt = Instant.now();
    }

    public static OrderStatusHistory record(
            Long orderId,
            OrderStatus fromStatus,
            OrderStatus toStatus,
            String action
    ) {
        return new OrderStatusHistory(orderId, fromStatus, toStatus, action);
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public OrderStatus getFromStatus() {
        return fromStatus;
    }

    public OrderStatus getToStatus() {
        return toStatus;
    }

    public String getAction() {
        return action;
    }

    public Instant getChangedAt() {
        return changedAt;
    }
}
