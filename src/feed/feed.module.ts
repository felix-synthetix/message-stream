import { Module } from '@nestjs/common';
import { FeedGateway } from './feed.gateway';
import { FeedService } from './feed.service';
import { StreamModule } from '../stream/stream.module';

@Module({
  imports: [StreamModule],
  providers: [
    FeedGateway,
    FeedService
  ],
  exports: [FeedService],
})
export class FeedModule {}
