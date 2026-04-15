import { SlotService } from './slot.service';
export declare class SlotController {
    private service;
    constructor(service: SlotService);
    getSlots(doctorId: number, date: string, duration: number): Promise<{
        startTime: string;
        endTime: string;
    }[]>;
}
