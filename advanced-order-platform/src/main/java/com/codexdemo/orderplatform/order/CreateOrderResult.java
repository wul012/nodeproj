package com.codexdemo.orderplatform.order;

public record CreateOrderResult(
        OrderResponse order,
        boolean replayed
) {
}
