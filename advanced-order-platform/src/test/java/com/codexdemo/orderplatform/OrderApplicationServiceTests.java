package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.common.BusinessException;
import com.codexdemo.orderplatform.inventory.InventoryItem;
import com.codexdemo.orderplatform.inventory.InventoryRepository;
import com.codexdemo.orderplatform.order.CreateOrderLineRequest;
import com.codexdemo.orderplatform.order.CreateOrderRequest;
import com.codexdemo.orderplatform.order.CreateOrderResult;
import com.codexdemo.orderplatform.order.OrderApplicationService;
import com.codexdemo.orderplatform.order.OrderResponse;
import com.codexdemo.orderplatform.order.OrderStatus;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class OrderApplicationServiceTests {

    @Autowired
    private OrderApplicationService orderApplicationService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Test
    void createOrderReservesStockAndReplaysIdempotentRequest() {
        Product product = productRepository.findAll().getFirst();
        InventoryItem before = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("11111111-1111-1111-1111-111111111111"),
                List.of(new CreateOrderLineRequest(product.getId(), 2))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-001", request);
        InventoryItem afterFirstCreate = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        CreateOrderResult replayed = orderApplicationService.createOrder("test-idempotency-key-001", request);
        InventoryItem afterReplay = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(created.replayed()).isFalse();
        assertThat(replayed.replayed()).isTrue();
        assertThat(replayed.order().id()).isEqualTo(created.order().id());
        assertThat(afterFirstCreate.getAvailable()).isEqualTo(before.getAvailable() - 2);
        assertThat(afterReplay.getAvailable()).isEqualTo(afterFirstCreate.getAvailable());
    }

    @Test
    void payOrderCommitsReservedInventory() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("22222222-2222-2222-2222-222222222222"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-002", request);
        OrderResponse paid = orderApplicationService.pay(created.order().id());
        InventoryItem inventory = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(paid.status()).isEqualTo(OrderStatus.PAID);
        assertThat(paid.paidAt()).isNotNull();
        assertThat(inventory.getReserved()).isGreaterThanOrEqualTo(0);
    }

    @Test
    void createOrderFailsWhenStockIsInsufficient() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("33333333-3333-3333-3333-333333333333"),
                List.of(new CreateOrderLineRequest(product.getId(), 1_000_000))
        );

        assertThatThrownBy(() -> orderApplicationService.createOrder("test-idempotency-key-003", request))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("has only");
    }
}
