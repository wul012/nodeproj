package com.codexdemo.orderplatform.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateOrderLineRequest(
        @NotNull Long productId,
        @Positive int quantity
) {
}
