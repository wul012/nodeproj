package com.codexdemo.orderplatform.inventory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

    List<InventoryMovement> findByProductIdOrderByCreatedAtAscIdAsc(Long productId);
}
