package com.codexdemo.orderplatform.order;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.common.BusinessException;
import com.codexdemo.orderplatform.inventory.InventoryService;
import com.codexdemo.orderplatform.outbox.OutboxEvent;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class OrderApplicationService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final InventoryService inventoryService;
    private final OutboxRepository outboxRepository;

    public OrderApplicationService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            InventoryService inventoryService,
            OutboxRepository outboxRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.inventoryService = inventoryService;
        this.outboxRepository = outboxRepository;
    }

    @Transactional
    public CreateOrderResult createOrder(String idempotencyKey, CreateOrderRequest request) {
        requireIdempotencyKey(idempotencyKey);

        return orderRepository.findByIdempotencyKey(idempotencyKey)
                .map(existing -> new CreateOrderResult(OrderResponse.from(existing), true))
                .orElseGet(() -> placeNewOrder(idempotencyKey, request));
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long orderId) {
        return OrderResponse.from(findOrder(orderId));
    }

    @Transactional
    public OrderResponse pay(Long orderId) {
        SalesOrder order = findOrder(orderId);
        if (order.getStatus() == OrderStatus.PAID) {
            return OrderResponse.from(order);
        }

        order.markPaid();
        inventoryService.commitReserved(order.quantitiesByProductId());
        outboxRepository.save(OutboxEvent.orderPaid(order));
        return OrderResponse.from(order);
    }

    @Transactional
    public OrderResponse cancel(Long orderId) {
        SalesOrder order = findOrder(orderId);
        if (order.cancel()) {
            inventoryService.releaseReserved(order.quantitiesByProductId());
            outboxRepository.save(OutboxEvent.orderCancelled(order));
        }
        return OrderResponse.from(order);
    }

    private CreateOrderResult placeNewOrder(String idempotencyKey, CreateOrderRequest request) {
        Map<Long, Integer> quantities = aggregateQuantities(request);
        Map<Long, Product> products = loadProducts(quantities);
        inventoryService.reserve(quantities);

        List<OrderLineDraft> drafts = quantities.entrySet().stream()
                .map(entry -> {
                    Product product = products.get(entry.getKey());
                    return new OrderLineDraft(product.getId(), product.getName(), product.getPrice(), entry.getValue());
                })
                .toList();

        SalesOrder order = SalesOrder.place(request.customerId(), idempotencyKey, drafts);
        SalesOrder saved = orderRepository.saveAndFlush(order);
        outboxRepository.save(OutboxEvent.orderCreated(saved));
        return new CreateOrderResult(OrderResponse.from(saved), false);
    }

    private Map<Long, Integer> aggregateQuantities(CreateOrderRequest request) {
        return request.items().stream()
                .collect(Collectors.toMap(
                        CreateOrderLineRequest::productId,
                        CreateOrderLineRequest::quantity,
                        Integer::sum,
                        LinkedHashMap::new
                ));
    }

    private Map<Long, Product> loadProducts(Map<Long, Integer> quantities) {
        Map<Long, Product> products = productRepository.findAllById(quantities.keySet()).stream()
                .filter(Product::isActive)
                .collect(Collectors.toMap(Product::getId, Function.identity()));

        quantities.keySet().stream()
                .filter(productId -> !products.containsKey(productId))
                .findFirst()
                .ifPresent(productId -> {
                    throw new BusinessException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND",
                            "Product " + productId + " was not found");
                });

        return products;
    }

    private SalesOrder findOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND",
                        "Order " + orderId + " was not found"));
    }

    private void requireIdempotencyKey(String idempotencyKey) {
        if (!StringUtils.hasText(idempotencyKey)) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "IDEMPOTENCY_KEY_REQUIRED",
                    "Idempotency-Key header is required");
        }
        if (idempotencyKey.length() > 120) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "IDEMPOTENCY_KEY_TOO_LONG",
                    "Idempotency-Key must not be longer than 120 characters");
        }
    }
}
