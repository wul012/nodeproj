package com.codexdemo.orderplatform.payment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "payment_transactions",
        indexes = @Index(name = "idx_payment_transactions_order_created", columnList = "order_id, created_at")
)
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PaymentStatus status;

    @Column(nullable = false, length = 40)
    private String provider;

    @Column(name = "provider_transaction_id", nullable = false, unique = true, length = 80)
    private String providerTransactionId;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant completedAt;

    protected PaymentTransaction() {
    }

    private PaymentTransaction(Long orderId, BigDecimal amount, String provider) {
        if (orderId == null) {
            throw new IllegalArgumentException("orderId is required");
        }
        if (amount == null || amount.signum() <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
        if (provider == null || provider.isBlank()) {
            throw new IllegalArgumentException("provider is required");
        }
        this.orderId = orderId;
        this.amount = amount;
        this.provider = provider;
        this.status = PaymentStatus.SUCCEEDED;
        this.providerTransactionId = "SIM-" + UUID.randomUUID();
        this.createdAt = Instant.now();
        this.completedAt = this.createdAt;
    }

    public static PaymentTransaction succeeded(Long orderId, BigDecimal amount) {
        return new PaymentTransaction(orderId, amount, "SIMULATED");
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public String getProvider() {
        return provider;
    }

    public String getProviderTransactionId() {
        return providerTransactionId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }
}
