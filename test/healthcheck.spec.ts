import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { HealthModule } from '../src/health.module';

describe('Healthcheck + Documentation Acceptance Tests', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /health', () => {

    it('should respond 200 ok and return health check message', async () => {
      await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect({ status: 'ok', message: 'Hello Kinso!' });
    });
  });

  // describe('GET /open-api', () => {
    // it('should respond 200 ok and return open api documentation', () => {
    //   request(app.getHttpServer())
    //     .get('/open-api')
    //     .expect(200)
    // });
  // });
  
  // describe('GET /async-api', () => {  

    // it('should respond 200 ok and return async api documentation', () => {
    //   request(app.getHttpServer())
    //     .get('/async-api')
    //     .expect(200)
    // });
  // });
});
