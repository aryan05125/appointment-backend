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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const availability_entity_1 = require("./availability.entity");
const typeorm_2 = require("typeorm");
let AvailabilityService = class AvailabilityService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async checkConflict(doctorId, startTime, endTime, day, date) {
        const existing = await this.repo.find({
            where: day ? { doctorId, day } : { doctorId, date },
        });
        for (let slot of existing) {
            if ((startTime >= slot.startTime && startTime < slot.endTime) ||
                (endTime > slot.startTime && endTime <= slot.endTime)) {
                throw new common_1.BadRequestException('Time slot conflict');
            }
        }
    }
    async createRecurring(data) {
        await this.checkConflict(data.doctorId, data.startTime, data.endTime, data.day);
        return this.repo.save({ ...data, type: 'recurring' });
    }
    async createCustom(data) {
        await this.checkConflict(data.doctorId, data.startTime, data.endTime, null, data.date);
        return this.repo.save({ ...data, type: 'custom' });
    }
    async getAvailability(doctorId, date) {
        const custom = await this.repo.find({
            where: { doctorId, date, type: 'custom' },
        });
        if (custom.length > 0)
            return custom;
        const day = new Date(date).toLocaleString('en-US', {
            weekday: 'long',
        });
        return this.repo.find({
            where: { doctorId, day, type: 'recurring' },
        });
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(availability_entity_1.Availability)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map