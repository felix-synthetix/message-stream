import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { whatsappWebhookStub } from '../src/whatsapp/stubs/whatsapp-webhook.stub';
import { PrioritisationModule } from '../src/prioengine/prioritisation.module';
import { WhatsappModule } from '../src/whatsapp/whatsapp.module';
import { MessageStream } from '../src/stream/stream.buffer';

describe('WhatsApp Webhook Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        WhatsappModule,
        PrioritisationModule
      ],
    })
    .overrideProvider(MessageStream)
    .useValue(new MessageStream([]))
    .compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add a scored message to the engine when a webhook is received', async () => {
    const stream = app.get<MessageStream>(MessageStream);
    
    const webhookPayload = whatsappWebhookStub('aeiou');
    const messageId = webhookPayload.entry[0].changes[0].value.messages[0].id;

    await request(app.getHttpServer())
      .post('/webhooks/whatsapp')
      .send(webhookPayload)
      .expect(200);

    const scoredMessages = stream.getBuffer();
    const message = scoredMessages[0];
    expect(message.message.id).toEqual(messageId);
    expect(message.score).toBe(100);
  });

  it('should score a message with no vowels as 0', async () => {
    const stream = app.get<MessageStream>(MessageStream);
    
    const webhookPayload = whatsappWebhookStub('rhythm');
    const messageId = webhookPayload.entry[0].changes[0].value.messages[0].id;

    await request(app.getHttpServer())
      .post('/webhooks/whatsapp')
      .send(webhookPayload)
      .expect(200);

    const scoredMessages = stream.getBuffer();
    const message = scoredMessages.find(m => m.message.id === messageId);

    expect(message).toBeDefined();
    expect(message!.score).toBe(0);
  });
});
