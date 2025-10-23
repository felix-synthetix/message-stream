// public/client.js
const feed = document.getElementById('feed');
const statusDiv = document.getElementById('status');

const socket = io({
  transports: ['websocket'],
  reconnection: true,
});

function displayMessage(message) {
  const item = document.createElement('li');
  item.className = 'message';
  item.innerHTML = `
    <div class="message-header">
      <span class="message-channel">${message.channel}</span>
      ${message.sender.name}
    </div>
    <div class="message-content">${message.content.text}</div>
  `;
  feed.prepend(item);
}

const messageForm = document.getElementById('messageForm');
const messageText = document.getElementById('messageText');

function generateWebhookPayload(textBody) {
  const from = `user_${Date.now()}`;
  const name = 'Demo User';
  return {
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        field: 'messages',
        value: {
          contacts: [{ profile: { name }, wa_id: from }],
          messages: [{
            from,
            id: `wamid.${btoa(Math.random()).substring(0, 12)}`,
            timestamp: Math.floor(Date.now() / 1000).toString(),
            text: { body: textBody },
            type: 'text',
          }],
        },
      }],
    }],
  };
}

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageText.value;
  if (!text) return;

  const payload = generateWebhookPayload(text);

  fetch('/webhooks/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    messageText.value = '';
  })
  .catch(error => {
    console.error('Error sending message:', error);
    statusDiv.textContent = 'Error sending message. See console for details.';
  });
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server.');
  statusDiv.textContent = 'Connection successful. Requesting message feed...';
  feed.innerHTML = '';
  socket.emit('message-feed', { precision: 50 });
});

socket.on('message', (message) => {
  displayMessage(message);
  statusDiv.textContent = 'Feed streaming...';
});

socket.on('feed-end', (data) => {
  console.log('Feed ended:', data.message);
  statusDiv.textContent = `Feed finished: ${data.message}. Waiting for new messages.`;
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server.');
  statusDiv.textContent = 'Disconnected. Attempting to reconnect...';
});

socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
  statusDiv.textContent = 'Connection failed. Please check the server.';
});
