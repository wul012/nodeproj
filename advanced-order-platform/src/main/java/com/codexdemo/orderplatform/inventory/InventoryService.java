package com.codexdemo.orderplatform.inventory;

import com.codexdemo.orderplatform.common.BusinessException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public void reserve(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> findLocked(entry.getKey()).reserve(entry.getValue()));
    }

    public void commitReserved(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> findLocked(entry.getKey()).commitReserved(entry.getValue()));
    }

    public void returnCommitted(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> findLocked(entry.getKey()).returnCommitted(entry.getValue()));
    }

    public void releaseReserved(Map<Long, Integer> productQuantities) {
        productQuantities.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> findLocked(entry.getKey()).releaseReserved(entry.getValue()));
    }

    private InventoryItem findLocked(Long productId) {
        return inventoryRepository.findByProductIdForUpdate(productId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "INVENTORY_NOT_FOUND",
                        "Inventory was not found for product " + productId));
    }
}
