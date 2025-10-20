import { Controller, Get, Query } from '@nestjs/common';
import { HotelDto } from './dto/hotel.dto';
import { HotelService } from './hotel.service';
import { ResponseDto } from './dto/reponseDto.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async getAllByCountry(
    @Query('country') country: string,
  ): Promise<ResponseDto<HotelDto[] | null>> {
    return this.hotelService.getAllByCountry(country);
  }

  @Get('cheap')
  async getOneByCountry(
    @Query('country') country: string,
    @Query('arriveTime') arriveTime: string,
  ): Promise<ResponseDto<HotelDto[] | null>> {
    return this.hotelService.getOneByCountry(country, arriveTime);
  }
}
