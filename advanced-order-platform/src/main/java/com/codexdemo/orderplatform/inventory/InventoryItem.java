package com.codexdemo.orderplatform.inventory;

import com.codexdemo.orderplatform.common.BusinessException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import org.springframework.http.HttpStatus;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long productId;

    @Column(nullable = false)
    private int available;

    @Column(nullable = false)
    private int reserved;

    @Version
    private long version;

    protected InventoryItem() {
    }

    private InventoryItem(Long productId, int available) {
        this.productId = productId;
        this.available = available;
        this.reserved = 0;
    }

    public static InventoryItem create(Long productId, int available) {
        return new InventoryItem(productId, available);
    }

    public void reserve(int quantity) {
        if (quantity <= 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_QUANTITY", "Quantity must be greater than zero");
        }
        if (available < quantity) {
            throw new BusinessException(HttpStatus.CONFLICT, "INSUFFICIENT_STOCK",
                    "Product " + productId + " has only " + available + " units available");
        }
        available -= quantity;
        reserved += quantity;
    }

    public void commitReserved(int quantity) {
        if (reserved < quantity) {
            throw new BusinessException(HttpStatus.CONFLICT, "RESERVATION_MISMATCH",
                    "Product " + productId + " reservation is lower than requested commit quantity");
        }
        reserved -= quantity;
    }

    public void releaseReserved(int quantity) {
        if (quantity <= 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_QUANTITY", "Quantity must be greater than zero");
        }
        if (reserved < quantity) {
            throw new BusinessException(HttpStatus.CONFLICT, "RESERVATION_MISMATCH",
                    "Product " + productId + " reservation is lower than requested release quantity");
        }
        reserved -= quantity;
        available += quantity;
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public int getAvailable() {
        return available;
    }

    public int getReserved() {
        return reserved;
    }

    public long getVersion() {
        return version;
    }
}
