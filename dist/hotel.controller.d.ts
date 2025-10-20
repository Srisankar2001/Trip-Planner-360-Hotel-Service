import { HotelDto } from './dto/hotel.dto';
import { HotelService } from './hotel.service';
import { ResponseDto } from './dto/reponseDto.dto';
export declare class HotelController {
    private readonly hotelService;
    constructor(hotelService: HotelService);
    getAllByCountry(country: string): Promise<ResponseDto<HotelDto[] | null>>;
    getOneByCountry(country: string, arriveTime: string): Promise<ResponseDto<HotelDto[] | null>>;
}
