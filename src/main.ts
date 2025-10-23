import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Message-Stream.ai API')
    .setDescription('REST API for Message-Stream.ai')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('open-api', app, swaggerDocument);

  const asyncApiOptions = new AsyncApiDocumentBuilder()
  .setTitle('Message-Stream.ai Feed API')
  .setDescription('Real-time message feed for the Message-Stream.ai application')
  .setVersion('1.0')
  .setDefaultContentType('application/json')
  .addServer('message-stream-ws', {
    url: 'ws://localhost:3001',
    protocol: 'websocket',
  })
  .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions);
  await AsyncApiModule.setup('async-api', app, asyncapiDocument);

  console.log('Web client: http://localhost:3000');
  console.log('Healthcheck: http://localhost:3000/health'); 
  console.log('OpenApi documentation: http://localhost:3000/open-api'); 
  console.log('AsyncAPI documentation: http://localhost:3000/async-api'); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
