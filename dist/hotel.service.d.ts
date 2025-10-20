import { OnModuleInit } from '@nestjs/common';
import { HotelDto } from './dto/hotel.dto';
import { Hotel } from './entity/hotel.entity';
import { Repository } from 'typeorm';
import { ResponseDto } from './dto/reponseDto.dto';
export declare class HotelService implements OnModuleInit {
    private readonly repo;
    constructor(repo: Repository<Hotel>);
    onModuleInit(): Promise<void>;
    getAllByCountry(country: string): Promise<ResponseDto<HotelDto[] | null>>;
    getOneByCountry(country: string, arriveTime: string): Promise<ResponseDto<HotelDto[] | null>>;
}
