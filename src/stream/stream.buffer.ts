import { Injectable } from "@nestjs/common";
import { ScoredMessage } from "../prioengine/dto/scored-message.dto";

@Injectable()
export class MessageStream {
  private signal: (() => void) | null = null;
  private buffer: ScoredMessage[] = [];

  constructor() {}

  add(message: ScoredMessage) {
    this.buffer.push(message);
    this.sendSignal();
  }

  take(): ScoredMessage | undefined {
    return this.buffer.shift();
  }

  isEmpty(): boolean {
    return this.buffer.length === 0;
  }

  getBuffer(): ScoredMessage[] {
    return this.buffer;
  }

  async awaitSignal() {
    const waitPromise = new Promise<void>((resolve) => {
      this.signal = resolve;
    });
    await waitPromise;
    this.signal = null;
  }

  sendSignal() {
    this.signal?.();
  }
}