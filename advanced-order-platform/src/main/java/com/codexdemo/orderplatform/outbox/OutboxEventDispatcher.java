package com.codexdemo.orderplatform.outbox;

public interface OutboxEventDispatcher {

    void dispatch(OutboxEvent event);
}
