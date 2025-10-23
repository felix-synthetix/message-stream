# Prioritisation Engine Module

This module contains the logic for scoring and prioritizing incoming messages.

## `PrioritisationEngine`

The `PrioritisationEngine` service is a conceptual stand-in for a more sophisticated AI/ML decision engine. Its purpose in a real-world application would be to analyze and rank all incoming communications to help users focus on what matters most.

### How It Works (Demonstration)

For this Proof of Concept, the scoring logic is intentionally simplistic:

1.  **Receives a Message**: It takes a `MessageDto` from an upstream service (like the WhatsApp service).
2.  **Calculates a Score**: It calculates a score from 0-100 based on the percentage of vowels versus other characters in the message's text content.
3.  **Stores the Scored Message**: It stores the original message along with its calculated score in the central `MessageStream` buffer.

### Real-World Vision

In a production version of Kinso.ai, this engine would be far more complex. It would score messages based on a variety of signals, such as:

-   **User-defined priorities**: Keywords, projects, or themes the user has marked as important.
-   **Sender importance**: Prioritizing messages from key contacts.
-   **Message content analysis**: Using Natural Language Processing (NLP) to understand urgency, sentiment, and intent.
-   **Behavioral patterns**: Learning from how the user interacts with different types of messages over time.

The goal is to provide a dynamic and personalized score that accurately reflects the relevance and importance of each message to the user at any given moment.
