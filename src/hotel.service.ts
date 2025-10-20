import { Injectable, OnModuleInit } from '@nestjs/common';
import { HotelDto } from './dto/hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entity/hotel.entity';
import { Repository } from 'typeorm';
import { data } from './seed/data';
import { ResponseDto } from './dto/reponseDto.dto';

@Injectable()
export class HotelService implements OnModuleInit {
  constructor(
    @InjectRepository(Hotel)
    private readonly repo: Repository<Hotel>,
  ) {}

  async onModuleInit() {
    await this.repo.save(data);
  }

  async getAllByCountry(
    country: string,
  ): Promise<ResponseDto<HotelDto[] | null>> {
    if (!country) {
      return new ResponseDto(false, 'Missing required query parameters', null);
    }

    if (country.trim() === '') {
      return new ResponseDto(false, 'Query parameters cannot be empty', null);
    }

    country = country.trim().toUpperCase();

    const existCountry = await this.repo.exists({
      where: [{ country: country }],
    });

    if (!existCountry) {
      return new ResponseDto(false, 'Destination Not Found', null);
    }

    const hotelList: HotelDto[] = [];
    const data = await this.repo.find({
      where: { country: country },
      order: { pricePerNight: 'ASC' },
      take: 3,
    });
    data.forEach((item) => {
      hotelList.push(
        new HotelDto(item.id, item.name, item.rating, item.pricePerNight),
      );
    });
    return new ResponseDto(true, 'Hotels Fetched Successfully', hotelList);
  }

  async getOneByCountry(
    country: string,
    arriveTime: string,
  ): Promise<ResponseDto<HotelDto[] | null>> {
    if (!country || !arriveTime) {
      return new ResponseDto(false, 'Missing required query parameters', null);
    }

    if (country.trim() === '' || arriveTime.trim() === '') {
      return new ResponseDto(false, 'Query parameters cannot be empty', null);
    }

    country = country.trim().toUpperCase();
    arriveTime = arriveTime.trim();

    const existCountry = await this.repo.exists({
      where: [{ country: country }],
    });

    if (!existCountry) {
      return new ResponseDto(false, 'Destination Not Found', null);
    }

    const lateCheckInTime = '20:00';
    let hotel: HotelDto[] = [];
    let data: HotelDto[];
    if (arriveTime < lateCheckInTime) {
      data = await this.repo.find({
        where: { country: country },
        order: { pricePerNight: 'ASC' },
        take: 3,
      });
    } else {
      data = await this.repo.find({
        where: { country: country, lateCheckin: true },
        order: { pricePerNight: 'ASC' },
        take: 3,
      });
    }
    data.forEach((item) => {
      hotel.push(
        new HotelDto(item.id, item.name, item.rating, item.pricePerNight),
      );
    });

    return new ResponseDto(true, 'Hotel Fetched Successfully', hotel);
  }
}
