package com.codexdemo.orderplatform.order;

import java.math.BigDecimal;

public record OrderLineResponse(
        Long productId,
        String productName,
        BigDecimal unitPrice,
        int quantity,
        BigDecimal lineTotal
) {

    static OrderLineResponse from(OrderLine line) {
        return new OrderLineResponse(
                line.getProductId(),
                line.getProductName(),
                line.getUnitPrice(),
                line.getQuantity(),
                line.getLineTotal()
        );
    }
}
