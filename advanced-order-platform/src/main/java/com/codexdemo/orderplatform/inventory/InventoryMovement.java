package com.codexdemo.orderplatform.inventory;

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
        name = "inventory_movements",
        indexes = @Index(name = "idx_inventory_movements_product_created", columnList = "product_id, created_at")
)
public class InventoryMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private InventoryMovementType type;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int availableBefore;

    @Column(nullable = false)
    private int reservedBefore;

    @Column(nullable = false)
    private int availableAfter;

    @Column(nullable = false)
    private int reservedAfter;

    @Column(nullable = false)
    private Instant createdAt;

    protected InventoryMovement() {
    }

    private InventoryMovement(
            Long productId,
            InventoryMovementType type,
            int quantity,
            int availableBefore,
            int reservedBefore,
            int availableAfter,
            int reservedAfter
    ) {
        if (productId == null) {
            throw new IllegalArgumentException("productId is required");
        }
        if (type == null) {
            throw new IllegalArgumentException("type is required");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("quantity must be positive");
        }
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.availableBefore = availableBefore;
        this.reservedBefore = reservedBefore;
        this.availableAfter = availableAfter;
        this.reservedAfter = reservedAfter;
        this.createdAt = Instant.now();
    }

    public static InventoryMovement record(
            InventoryItem item,
            InventoryMovementType type,
            int quantity,
            int availableBefore,
            int reservedBefore
    ) {
        return new InventoryMovement(
                item.getProductId(),
                type,
                quantity,
                availableBefore,
                reservedBefore,
                item.getAvailable(),
                item.getReserved()
        );
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public InventoryMovementType getType() {
        return type;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getAvailableBefore() {
        return availableBefore;
    }

    public int getReservedBefore() {
        return reservedBefore;
    }

    public int getAvailableAfter() {
        return availableAfter;
    }

    public int getReservedAfter() {
        return reservedAfter;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
