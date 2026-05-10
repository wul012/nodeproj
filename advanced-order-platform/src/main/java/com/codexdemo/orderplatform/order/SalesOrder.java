package com.codexdemo.orderplatform.order;

import com.codexdemo.orderplatform.common.BusinessException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;

@Entity
@Table(name = "orders")
public class SalesOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID customerId;

    @Column(nullable = false, unique = true, length = 120)
    private String idempotencyKey;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OrderStatus status;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant paidAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLine> lines = new ArrayList<>();

    @Version
    private long version;

    protected SalesOrder() {
    }

    private SalesOrder(UUID customerId, String idempotencyKey) {
        this.customerId = customerId;
        this.idempotencyKey = idempotencyKey;
        this.status = OrderStatus.CREATED;
        this.createdAt = Instant.now();
        this.totalAmount = BigDecimal.ZERO;
    }

    public static SalesOrder place(UUID customerId, String idempotencyKey, List<OrderLineDraft> drafts) {
        if (drafts.isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "EMPTY_ORDER", "Order must contain at least one item");
        }

        SalesOrder order = new SalesOrder(customerId, idempotencyKey);
        drafts.stream()
                .map(draft -> OrderLine.from(draft, order))
                .forEach(order.lines::add);
        order.totalAmount = order.lines.stream()
                .map(OrderLine::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return order;
    }

    public void markPaid() {
        if (status == OrderStatus.PAID) {
            return;
        }
        if (status != OrderStatus.CREATED) {
            throw new BusinessException(HttpStatus.CONFLICT, "ORDER_STATUS_INVALID",
                    "Only CREATED orders can be paid");
        }
        status = OrderStatus.PAID;
        paidAt = Instant.now();
    }

    public Map<Long, Integer> quantitiesByProductId() {
        return lines.stream()
                .collect(Collectors.toMap(OrderLine::getProductId, OrderLine::getQuantity, Integer::sum));
    }

    public Long getId() {
        return id;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getPaidAt() {
        return paidAt;
    }

    public List<OrderLine> getLines() {
        return List.copyOf(lines);
    }
}
