// src/main.ts
import 'dotenv/config'; // ✅ Esto sí es necesario aquí

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3000);
}
void bootstrap();
