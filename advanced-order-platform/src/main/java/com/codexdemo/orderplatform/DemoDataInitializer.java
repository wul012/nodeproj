package com.codexdemo.orderplatform;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.inventory.InventoryItem;
import com.codexdemo.orderplatform.inventory.InventoryRepository;
import java.math.BigDecimal;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DemoDataInitializer implements ApplicationRunner {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public DemoDataInitializer(ProductRepository productRepository, InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (productRepository.count() > 0) {
            return;
        }

        Product keyboard = productRepository.save(Product.create("SKU-KEYBOARD-001", "Mechanical Keyboard", new BigDecimal("499.00")));
        Product monitor = productRepository.save(Product.create("SKU-MONITOR-002", "27 Inch Monitor", new BigDecimal("1399.00")));
        Product headphones = productRepository.save(Product.create("SKU-HEADSET-003", "Noise Cancelling Headphones", new BigDecimal("899.00")));

        inventoryRepository.save(InventoryItem.create(keyboard.getId(), 100));
        inventoryRepository.save(InventoryItem.create(monitor.getId(), 40));
        inventoryRepository.save(InventoryItem.create(headphones.getId(), 25));
    }
}
