package com.codexdemo.orderplatform.inventory;

import java.time.Instant;

public record InventoryMovementResponse(
        Long id,
        Long productId,
        InventoryMovementType type,
        int quantity,
        int availableBefore,
        int reservedBefore,
        int availableAfter,
        int reservedAfter,
        Instant createdAt
) {

    static InventoryMovementResponse from(InventoryMovement movement) {
        return new InventoryMovementResponse(
                movement.getId(),
                movement.getProductId(),
                movement.getType(),
                movement.getQuantity(),
                movement.getAvailableBefore(),
                movement.getReservedBefore(),
                movement.getAvailableAfter(),
                movement.getReservedAfter(),
                movement.getCreatedAt()
        );
    }
}
