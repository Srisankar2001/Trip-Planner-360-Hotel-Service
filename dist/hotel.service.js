"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelService = void 0;
const common_1 = require("@nestjs/common");
const hotel_dto_1 = require("./dto/hotel.dto");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_entity_1 = require("./entity/hotel.entity");
const typeorm_2 = require("typeorm");
const data_1 = require("./seed/data");
const reponseDto_dto_1 = require("./dto/reponseDto.dto");
let HotelService = class HotelService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        await this.repo.save(data_1.data);
    }
    async getAllByCountry(country) {
        if (!country) {
            return new reponseDto_dto_1.ResponseDto(false, 'Missing required query parameters', null);
        }
        if (country.trim() === '') {
            return new reponseDto_dto_1.ResponseDto(false, 'Query parameters cannot be empty', null);
        }
        country = country.trim().toUpperCase();
        const existCountry = await this.repo.exists({
            where: [{ country: country }],
        });
        if (!existCountry) {
            return new reponseDto_dto_1.ResponseDto(false, 'Destination Not Found', null);
        }
        const hotelList = [];
        const data = await this.repo.find({
            where: { country: country },
            order: { pricePerNight: 'ASC' },
            take: 3,
        });
        data.forEach((item) => {
            hotelList.push(new hotel_dto_1.HotelDto(item.id, item.name, item.rating, item.pricePerNight));
        });
        return new reponseDto_dto_1.ResponseDto(true, 'Hotels Fetched Successfully', hotelList);
    }
    async getOneByCountry(country, arriveTime) {
        console.log(country);
        console.log(arriveTime);
        if (!country || !arriveTime) {
            return new reponseDto_dto_1.ResponseDto(false, 'Missing required query parameters', null);
        }
        if (country.trim() === '' || arriveTime.trim() === '') {
            return new reponseDto_dto_1.ResponseDto(false, 'Query parameters cannot be empty', null);
        }
        country = country.trim().toUpperCase();
        arriveTime = arriveTime.trim();
        const existCountry = await this.repo.exists({
            where: [{ country: country }],
        });
        if (!existCountry) {
            return new reponseDto_dto_1.ResponseDto(false, 'Destination Not Found', null);
        }
        const lateCheckInTime = '20:00';
        let hotel = null;
        let data = null;
        if (arriveTime < lateCheckInTime) {
            data = await this.repo.findOne({
                where: { country: country },
                order: { pricePerNight: 'ASC' },
            });
        }
        else {
            data = await this.repo.findOne({
                where: { country: country, lateCheckin: true },
                order: { pricePerNight: 'ASC' },
            });
        }
        if (data) {
            hotel = new hotel_dto_1.HotelDto(data.id, data.name, data.rating, data.pricePerNight);
        }
        return new reponseDto_dto_1.ResponseDto(true, 'Hotel Fetched Successfully', hotel);
    }
};
exports.HotelService = HotelService;
exports.HotelService = HotelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelService);
//# sourceMappingURL=hotel.service.js.map