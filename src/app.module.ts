import { Module } from '@nestjs/common';
import { HealthModule } from './health.module';
import { FeedModule } from './feed/feed.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { PrioritisationModule } from './prioengine/prioritisation.module';

@Module({
  imports: [
    HealthModule,
    FeedModule,
    EventEmitterModule.forRoot(),
    WhatsappModule,
    PrioritisationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
