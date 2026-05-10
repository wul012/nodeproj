package com.codexdemo.orderplatform.inventory;

import com.codexdemo.orderplatform.common.BusinessException;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final InventoryMovementRepository inventoryMovementRepository;

    public InventoryService(
            InventoryRepository inventoryRepository,
            InventoryMovementRepository inventoryMovementRepository
    ) {
        this.inventoryRepository = inventoryRepository;
        this.inventoryMovementRepository = inventoryMovementRepository;
    }

    public void reserve(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> applyAndRecord(
                        entry.getKey(),
                        entry.getValue(),
                        InventoryMovementType.RESERVE,
                        item -> item.reserve(entry.getValue())
                ));
    }

    public void commitReserved(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> applyAndRecord(
                        entry.getKey(),
                        entry.getValue(),
                        InventoryMovementType.COMMIT_RESERVED,
                        item -> item.commitReserved(entry.getValue())
                ));
    }

    public void returnCommitted(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> applyAndRecord(
                        entry.getKey(),
                        entry.getValue(),
                        InventoryMovementType.RETURN_COMMITTED,
                        item -> item.returnCommitted(entry.getValue())
                ));
    }

    public void releaseReserved(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> applyAndRecord(
                        entry.getKey(),
                        entry.getValue(),
                        InventoryMovementType.RELEASE_RESERVED,
                        item -> item.releaseReserved(entry.getValue())
                ));
    }

    public List<InventoryMovementResponse> listProductMovements(Long productId) {
        findExisting(productId);
        return inventoryMovementRepository.findByProductIdOrderByCreatedAtAscIdAsc(productId).stream()
                .map(InventoryMovementResponse::from)
                .toList();
    }

    private void applyAndRecord(
            Long productId,
            int quantity,
            InventoryMovementType type,
            Consumer<InventoryItem> operation
    ) {
        InventoryItem item = findLocked(productId);
        int availableBefore = item.getAvailable();
        int reservedBefore = item.getReserved();
        operation.accept(item);
        inventoryMovementRepository.save(InventoryMovement.record(
                item,
                type,
                quantity,
                availableBefore,
                reservedBefore
        ));
    }

    private InventoryItem findLocked(Long productId) {
        return inventoryRepository.findByProductIdForUpdate(productId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "INVENTORY_NOT_FOUND",
                        "Inventory was not found for product " + productId));
    }

    private InventoryItem findExisting(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "INVENTORY_NOT_FOUND",
                        "Inventory was not found for product " + productId));
    }
}
