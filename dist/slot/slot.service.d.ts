import { AvailabilityService } from '../availability/availability.service';
type Slot = {
    startTime: string;
    endTime: string;
};
export declare class SlotService {
    private availabilityService;
    constructor(availabilityService: AvailabilityService);
    generateSlots(startTime: string, endTime: string, duration: number): Slot[];
    getSlots(doctorId: number, date: string, duration?: number): Promise<Slot[]>;
    timeToMinutes(time: string): number;
    minutesToTime(minutes: number): string;
}
export {};
