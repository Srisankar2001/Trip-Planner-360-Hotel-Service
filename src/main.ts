import { NestFactory } from '@nestjs/core';
import { HotelModule } from './hotel.module';

async function bootstrap() {
  const app = await NestFactory.create(HotelModule);
  await app.listen(3002);
}
bootstrap();
