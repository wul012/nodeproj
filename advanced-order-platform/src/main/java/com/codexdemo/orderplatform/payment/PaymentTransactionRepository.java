package com.codexdemo.orderplatform.payment;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {

    List<PaymentTransaction> findByOrderIdOrderByCreatedAtAscIdAsc(Long orderId);

    long countByOrderIdAndStatus(Long orderId, PaymentStatus status);

    Optional<PaymentTransaction> findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
            Long orderId,
            PaymentStatus status
    );
}
