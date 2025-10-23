import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageStream } from '../stream/stream.buffer';

@Injectable()
export class FeedService {
  constructor(private readonly state: MessageStream) {}

  async *getMessageFeed(
    precision = 50,
  ): AsyncIterableIterator<MessageDto> {
    while (true) {
      while (!this.state.isEmpty()) {
        
        const message = this.state.take(); 

        if (message && message.score >= precision) {
          yield message.message;
        }
      }

      await this.state.awaitSignal();
    }
  }

  stopFeed() {
    this.state.sendSignal();
  }
}