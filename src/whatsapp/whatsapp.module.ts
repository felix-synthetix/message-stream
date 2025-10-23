// src/whatsapp/whatsapp.module.ts
import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { PrioritisationModule } from '../prioengine/prioritisation.module';

@Module({
  imports: [PrioritisationModule],
  controllers: [WhatsappController],
  providers: [WhatsappService],
})
export class WhatsappModule {}
