// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { MessageDto } from '../feed/dto/message.dto';
import { WhatsappWebhookDto } from './dto/whatsapp-webhook.dto';
import { PrioritisationEngine } from '../prioengine/prioritisation.service';

@Injectable()
export class WhatsappService {
  constructor(private readonly prioritisationEngine: PrioritisationEngine) {}

  handleWebhook(payload: WhatsappWebhookDto): void {
    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        if (change.field === 'messages') {
          const messageData = change.value.messages[0];
          const contactData = change.value.contacts[0];

          const message: MessageDto = {
            id: messageData.id,
            timestamp: new Date(parseInt(messageData.timestamp) * 1000).toISOString(),
            channel: 'whatsapp',
            conversation: {
              id: `whatsapp-${contactData.wa_id}`,
              name: `Conversation with ${contactData.profile.name}`,
            },
            sender: {
              id: contactData.wa_id,
              name: contactData.profile.name,
              handle: contactData.wa_id,
            },
            content: {
              text: messageData.text.body,
            },
            metadata: {
              whatsapp: {
                ...messageData,
                ...contactData,
              },
            },
          };

          this.prioritisationEngine.addMessage(message);
        }
      }
    }
  }
}
