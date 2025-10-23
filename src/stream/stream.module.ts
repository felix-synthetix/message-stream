import { Module } from '@nestjs/common';
import { MessageStream } from './stream.buffer';

@Module({
  providers: [
    MessageStream
  ],
  exports: [MessageStream],
})
export class StreamModule {}
