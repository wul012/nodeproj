package com.codexdemo.orderplatform.payment;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentTransactionResponse(
        Long id,
        Long orderId,
        BigDecimal amount,
        PaymentStatus status,
        String provider,
        String providerTransactionId,
        Instant createdAt,
        Instant completedAt
) {

    public static PaymentTransactionResponse from(PaymentTransaction transaction) {
        return new PaymentTransactionResponse(
                transaction.getId(),
                transaction.getOrderId(),
                transaction.getAmount(),
                transaction.getStatus(),
                transaction.getProvider(),
                transaction.getProviderTransactionId(),
                transaction.getCreatedAt(),
                transaction.getCompletedAt()
        );
    }
}
