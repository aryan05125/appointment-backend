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
exports.SlotController = void 0;
const common_1 = require("@nestjs/common");
const slot_service_1 = require("./slot.service");
let SlotController = class SlotController {
    service;
    constructor(service) {
        this.service = service;
    }
    getSlots(doctorId, date, duration) {
        return this.service.getSlots(Number(doctorId), date, Number(duration) || 15);
    }
};
exports.SlotController = SlotController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('doctorId')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('duration')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", void 0)
], SlotController.prototype, "getSlots", null);
exports.SlotController = SlotController = __decorate([
    (0, common_1.Controller)('slots'),
    __metadata("design:paramtypes", [slot_service_1.SlotService])
], SlotController);
//# sourceMappingURL=slot.controller.js.map