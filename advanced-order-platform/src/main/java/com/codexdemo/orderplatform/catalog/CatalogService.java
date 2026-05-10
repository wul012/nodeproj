package com.codexdemo.orderplatform.catalog;

import com.codexdemo.orderplatform.inventory.InventoryRepository;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CatalogService {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public CatalogService(ProductRepository productRepository, InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listProducts() {
        Map<Long, Integer> stocks = inventoryRepository.findAll().stream()
                .collect(Collectors.toMap(item -> item.getProductId(), item -> item.getAvailable()));

        return productRepository.findAll().stream()
                .filter(Product::isActive)
                .map(product -> ProductResponse.from(product, stocks.getOrDefault(product.getId(), 0)))
                .toList();
    }
}
