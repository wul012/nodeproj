package com.codexdemo.orderplatform.order;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "order.expiration")
public class OrderExpirationProperties {

    private boolean enabled = true;
    private Duration unpaidTimeout = Duration.ofMinutes(15);

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Duration getUnpaidTimeout() {
        return unpaidTimeout;
    }

    public void setUnpaidTimeout(Duration unpaidTimeout) {
        this.unpaidTimeout = unpaidTimeout;
    }
}
