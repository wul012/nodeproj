package com.codexdemo.orderplatform.order;

import java.math.BigDecimal;

public record OrderLineDraft(
        Long productId,
        String productName,
        BigDecimal unitPrice,
        int quantity
) {
}
