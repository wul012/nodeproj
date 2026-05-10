alter table failed_event_messages
    add column management_status varchar(32) not null default 'OPEN';

alter table failed_event_messages
    add column management_note varchar(500);

alter table failed_event_messages
    add column managed_by varchar(80);

alter table failed_event_messages
    add column managed_at timestamp(6) with time zone;

create index idx_failed_event_messages_management
    on failed_event_messages (management_status, managed_at);
