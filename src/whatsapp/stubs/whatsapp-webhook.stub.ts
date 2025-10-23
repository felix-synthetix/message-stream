// src/whatsapp/stubs/whatsapp-webhook.stub.ts
import { WhatsappWebhookDto } from '../dto/whatsapp-webhook.dto';
import { faker } from '@faker-js/faker';

export const whatsappWebhookStub = (
  textBody: string = faker.lorem.sentence(),
): WhatsappWebhookDto => {
  const from = faker.phone.number();
  const name = faker.person.fullName();

  return {
    object: 'whatsapp_business_account',
    entry: [
      {
        changes: [
          {
            field: 'messages',
            value: {
              contacts: [
                {
                  profile: { name },
                  wa_id: from,
                },
              ],
              messages: [
                {
                  from,
                  id: `wamid.${faker.string.uuid()}`,
                  timestamp: faker.date.recent().getTime().toString().substring(0, 10),
                  text: { body: textBody },
                  type: 'text',
                },
              ],
            },
          },
        ],
      },
    ],
  };
};
