export interface DomainEvent<TPayload = unknown> {
  name: string;
  occurredAt: string;
  payload: TPayload;
}

type EventHandler<TPayload = unknown> = (event: DomainEvent<TPayload>) => void | Promise<void>;

export class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  subscribe<TPayload>(eventName: string, handler: EventHandler<TPayload>): () => void {
    const eventHandlers = this.handlers.get(eventName) ?? new Set<EventHandler>();
    eventHandlers.add(handler as EventHandler);
    this.handlers.set(eventName, eventHandlers);

    return () => {
      eventHandlers.delete(handler as EventHandler);
    };
  }

  async publish<TPayload>(event: DomainEvent<TPayload>): Promise<void> {
    const handlers = this.handlers.get(event.name);
    if (!handlers) return;

    await Promise.all(
      [...handlers].map((handler) => handler(event as DomainEvent)),
    );
  }
}
