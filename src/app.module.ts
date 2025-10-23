import { Module } from '@nestjs/common';
import { HealthModule } from './health.module';
import { FeedModule } from './feed/feed.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { PrioritisationModule } from './prioengine/prioritisation.module';
import { StreamModule } from './stream/stream.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    HealthModule,
    FeedModule,
    EventEmitterModule.forRoot(),
    WhatsappModule,
    PrioritisationModule,
    StreamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
