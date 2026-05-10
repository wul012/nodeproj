package com.codexdemo.orderplatform.catalog;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String sku,
        String name,
        BigDecimal price,
        int availableStock
) {

    static ProductResponse from(Product product, int availableStock) {
        return new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getPrice(), availableStock);
    }
}
