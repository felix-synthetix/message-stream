import { Injectable } from '@nestjs/common';
import { MessageDto } from '../feed/dto/message.dto';
import { MessageStream } from '../stream/stream.buffer';

@Injectable()
export class PrioritisationEngine {
  constructor(private readonly buffer: MessageStream) {}

  private calculateScore(message: MessageDto): number {
    const text = message.content.text?.toLowerCase() ?? '';
    if (text.length === 0) {
      return 0;
    }
    const vowelCount = (text.match(/[aeiou]/g) || []).length;
    const score = Math.round((vowelCount / text.length) * 100);
    return Math.min(score, 100); // Ensure score is not over 100
  }

  addMessage(message: MessageDto): void {
    const score = this.calculateScore(message);
    this.buffer.add({ score, message });
  }
}
