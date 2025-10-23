# Stream Module

This module contains the core in-memory message buffer and signaling mechanism for the application.

## `MessageStream`

The `MessageStream` class is a crucial component for this demonstration, designed to emulate a persistent, real-time eventing service like **AWS EventBridge** or a **Kafka** topic.

### How It Works

1.  **In-Memory Buffer**: It holds an array of `ScoredMessage` objects in memory. In a real-world application, this would be replaced by a durable message broker.

2.  **Adding Messages**: The `add()` method allows producers (like the `PrioritisationEngine`) to add new messages to the buffer.

3.  **Signaling**: When a new message is added, `MessageStream` sends a signal. This is analogous to an event bus notifying consumers that new data is available.

4.  **Asynchronous Waiting**: The `awaitSignal()` method allows consumers (like the `FeedService`) to pause and wait asynchronously for the next signal, preventing them from constantly polling the buffer. This creates an efficient, push-based architecture where the feed is "woken up" only when there is new data to process.

For the purpose of this demo, it provides a simple yet effective way to simulate how a real-time, event-driven system would behave without the complexity of setting up a full message broker.
