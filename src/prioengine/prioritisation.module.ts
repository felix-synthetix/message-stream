// src/prioengine/prioritisation.module.ts
import { Module } from '@nestjs/common';
import { PrioritisationEngine } from './prioritisation.service';
import { StreamModule } from '../stream/stream.module';

@Module({
  imports: [StreamModule],
  providers: [PrioritisationEngine],
  exports: [PrioritisationEngine],
})
export class PrioritisationModule {}
