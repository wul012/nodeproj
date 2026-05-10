package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FailedEventManagementHistoryRepository
        extends JpaRepository<FailedEventManagementHistory, Long>, JpaSpecificationExecutor<FailedEventManagementHistory> {

    List<FailedEventManagementHistory> findByFailedEventMessageIdOrderByChangedAtDescIdDesc(Long failedEventMessageId);
}
