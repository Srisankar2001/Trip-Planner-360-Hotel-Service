import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entity/hotel.entity';
import { HotelService } from './hotel.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Hotel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Hotel]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
