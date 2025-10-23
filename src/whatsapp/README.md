# WhatsApp Module

This module simulates the integration of an external channel (WhatsApp) into the message-stream.ai system. It is for demonstration purposes only and does not connect to the actual WhatsApp API.

## How It Works

1.  **Webhook Endpoint**: The `WhatsappController` exposes a REST endpoint at `POST /webhooks/whatsapp`. This endpoint is designed to mimic the callback that a real WhatsApp integration would use to push new messages into our system.

2.  **Payload Handling**: The endpoint accepts a JSON payload that simulates the structure of a real WhatsApp message notification. The structure is defined in the `WhatsappWebhookDto`.

3.  **Transformation**: The `WhatsappService` receives the webhook payload. Its primary responsibility is to transform the WhatsApp-specific data structure into the canonical `MessageDto` used throughout the Message-Stream.ai application.

4.  **Prioritisation**: Once the message is transformed, the service sends it to the `PrioritisationEngine`. The engine then scores the message based on its content and adds it to the central message buffer.
