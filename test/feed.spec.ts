import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { io, Socket } from 'socket.io-client';
import { MessageDto } from '../src/feed/dto/message.dto';
import { messageStub } from '../src/feed/stubs/message.stub';
import { FeedModule } from '../src/feed/feed.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScoredMessage } from '../src/prioengine/dto/scored-message.dto';
import { MessageStream } from '../src/stream/stream.buffer';

describe('Message Feed Acceptance Tests', () => {
  let app: INestApplication;
  let socket: Socket;
  let messageBuffer: ScoredMessage[];

  beforeAll(async () => {
    messageBuffer = [
      { score: 100, message: messageStub() }, 
      { score: 80, message: messageStub() }, 
      { score: 20, message: messageStub() }
    ];

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FeedModule, EventEmitterModule.forRoot()],
    })
      .overrideProvider(MessageStream)
      .useValue(new MessageStream(messageBuffer))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3001);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach((done) => {
    socket = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: false,
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterEach(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it('should stream all messages from the buffer and end the feed', (done) => {
    const received: MessageDto[] = [];

    socket.on('message', (message: MessageDto) => {
      received.push(message);
    });

    socket.on('feed-end', (data: { message: string }) => {
      expect(data.message).toContain('successfully');
      expect(received.length).toBe(messageBuffer.length);
      done();
    });

    socket.emit('message-feed');
  });

  it('should stop the feed when a stop-feed message is received', (done) => {
    const received: MessageDto[] = [];

    socket.on('message', (message: MessageDto) => {
      received.push(message);
    });

    socket.on('feed-end', (data: { message: string }) => {
      expect(data.message).toContain('cancelled');
      expect(received.length).toBeLessThan(messageBuffer.length);
      done();
    });

    socket.emit('message-feed');
    socket.emit('stop-feed');
  });

  it('should gracefully handle an abrupt client disconnection', (done) => {
    let feedEnded = false;
    socket.on('feed-end', () => {
      feedEnded = true;
    });

    socket.emit('message-feed');
    socket.disconnect();

    setTimeout(() => {
      expect(feedEnded).toBe(false);
      done();
    }, 500);
  });

  it('should only stream messages matching the requested precision', (done) => {
    const received: MessageDto[] = [];
    const precision = 75;
    const expectedCount = messageBuffer.filter(m => m.score >= precision).length;

    socket.on('message', (message: MessageDto) => {
      received.push(message);
    });

    socket.on('feed-end', (data: { message: string }) => {
      expect(data.message).toContain('successfully');
      expect(received.length).toBe(expectedCount);
      done();
    });

    socket.emit('message-feed', { precision });
  });

  it('should use a default precision of 50 if none is provided', (done) => {
    const received: MessageDto[] = [];
    const defaultPrecision = 50;
    const expectedCount = messageBuffer.filter(m => m.score >= defaultPrecision).length;

    socket.on('message', (message: MessageDto) => {
      received.push(message);
    });

    socket.on('feed-end', (data: { message: string }) => {
      expect(data.message).toContain('successfully');
      expect(received.length).toBe(expectedCount);
      done();
    });

    socket.emit('message-feed', {}); // Empty payload
  });
});

describe('When the message buffer is empty', () => {
  let app: INestApplication;
  let socket: Socket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FeedModule, EventEmitterModule.forRoot()],
    })
    .overrideProvider(MessageStream)
    .useValue(new MessageStream([]))
    .compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3002);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach((done) => {
    socket = io('http://localhost:3002', {
      transports: ['websocket'],
      reconnection: false,
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterEach(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it('should start and end the feed successfully with no messages', (done) => {
    const received: MessageDto[] = [];

    socket.on('message', (message: MessageDto) => {
      received.push(message);
    });

    socket.on('feed-end', (data: { message: string }) => {
      expect(data.message).toContain('successfully');
      expect(received.length).toBe(0);
      done();
    });

    socket.emit('message-feed');
  });
});
