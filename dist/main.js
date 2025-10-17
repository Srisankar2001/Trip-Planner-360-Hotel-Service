"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const hotel_module_1 = require("./hotel.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(hotel_module_1.HotelModule);
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map