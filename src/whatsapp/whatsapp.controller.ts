// src/whatsapp/whatsapp.controller.ts
import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WhatsappWebhookDto } from './dto/whatsapp-webhook.dto';
import { WhatsappService } from './whatsapp.service';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('whatsapp')
  @HttpCode(200) // WhatsApp expects a 200 OK
  @ApiOperation({ summary: 'Handle incoming WhatsApp messages' })
  @ApiResponse({ status: 200, description: 'Webhook received successfully.' })
  handleWebhook(@Body() body: WhatsappWebhookDto): void {
    this.whatsappService.handleWebhook(body);
  }
}
