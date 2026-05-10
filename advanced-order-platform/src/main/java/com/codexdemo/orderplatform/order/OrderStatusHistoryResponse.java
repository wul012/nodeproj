package com.codexdemo.orderplatform.order;

import java.time.Instant;

public record OrderStatusHistoryResponse(
        Long id,
        Long orderId,
        OrderStatus fromStatus,
        OrderStatus toStatus,
        String action,
        Instant changedAt
) {

    static OrderStatusHistoryResponse from(OrderStatusHistory history) {
        return new OrderStatusHistoryResponse(
                history.getId(),
                history.getOrderId(),
                history.getFromStatus(),
                history.getToStatus(),
                history.getAction(),
                history.getChangedAt()
        );
    }
}
