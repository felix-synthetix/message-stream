// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check the health of the service' })
  @ApiResponse({ status: 200, description: 'Service is healthy.', schema: { example: { status: 'ok' } } })
  check() {
    return { status: 'ok', message: 'Hello Kinso!' };
  }
}
