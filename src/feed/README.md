# Feed Module

This module serves as the primary interface for clients (e.g., web or mobile applications) to connect to the Message-Stream.ai system and receive a live, prioritized stream of messages.

## How It Works

The module uses a WebSocket-based approach to provide a real-time feed to the user.

### Core Components

1.  **`FeedGateway`**: This is the WebSocket gateway that manages client connections. It listens for specific events from the client, such as a request for the message feed, and handles the streaming of messages back to that client. It also manages the connection lifecycle, including graceful disconnections.

2.  **`FeedService`**: This service contains the core logic for preparing the message feed. It communicates with the `PrioritisationEngine` to retrieve the list of scored messages. It is responsible for:
    *   **Filtering**: Applying the `precision` filter sent by the client to only include messages that meet the desired score threshold.
    *   **Sorting**: Arranging the filtered messages in descending order based on their score, ensuring the most important messages are delivered first.

### Client Interaction Flow

1.  A client establishes a WebSocket connection to the server.
2.  The client emits a `message-feed` event. This event can include an optional payload with a `precision` value (e.g., `{ precision: 75 }`). If no precision is provided, a default of 50 is used.
3.  The `FeedGateway` receives this request and calls the `FeedService` with the specified precision.
4.  The `FeedService` prepares the sorted and filtered list of messages.
5.  The `FeedGateway` iterates through this list and streams each message back to the client via a `message` event.
6.  Once all messages have been sent, the gateway emits a `feed-end` event to signal that the initial stream is complete.
