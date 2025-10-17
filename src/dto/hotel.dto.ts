export class HotelDto {
  id: number;
  name: string;
  rating: number;
  pricePerNight: number;
  constructor(id: number, name: string, rating: number, pricePerNight: number) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.pricePerNight = pricePerNight;
  }
}
