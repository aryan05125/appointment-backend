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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotService = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("../availability/availability.service");
let SlotService = class SlotService {
    availabilityService;
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    generateSlots(startTime, endTime, duration) {
        const slots = [];
        let start = this.timeToMinutes(startTime);
        const end = this.timeToMinutes(endTime);
        while (start + duration <= end) {
            const slotStart = this.minutesToTime(start);
            const slotEnd = this.minutesToTime(start + duration);
            slots.push({ startTime: slotStart, endTime: slotEnd });
            start += duration;
        }
        return slots;
    }
    async getSlots(doctorId, date, duration = 15) {
        const availability = await this.availabilityService.getAvailability(doctorId, date);
        let allSlots = [];
        for (let a of availability) {
            const slots = this.generateSlots(a.startTime, a.endTime, duration);
            allSlots.push(...slots);
        }
        const now = new Date();
        const selectedDate = new Date(date);
        if (selectedDate.toDateString() === now.toDateString()) {
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            allSlots = allSlots.filter((slot) => {
                const slotStart = this.timeToMinutes(slot.startTime);
                return slotStart > currentMinutes;
            });
        }
        return allSlots;
    }
    timeToMinutes(time) {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    }
    minutesToTime(minutes) {
        const h = Math.floor(minutes / 60)
            .toString()
            .padStart(2, '0');
        const m = (minutes % 60).toString().padStart(2, '0');
        return `${h}:${m}`;
    }
};
exports.SlotService = SlotService;
exports.SlotService = SlotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], SlotService);
//# sourceMappingURL=slot.service.js.map