import { MessageDto } from '../dto/message.dto';
import { faker } from '@faker-js/faker';

export const messageStub = (): MessageDto => ({
  id: faker.string.uuid(),
  timestamp: faker.date.recent().toISOString(),
  channel: faker.helpers.arrayElement(['email', 'sms', 'slack', 'whatsapp']),
  conversation: {
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
  },
  sender: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: faker.internet.email(),
  },
  content: {
    text: faker.lorem.paragraph(),
  },
});
