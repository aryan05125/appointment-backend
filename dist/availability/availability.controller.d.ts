import { AvailabilityService } from './availability.service';
export declare class AvailabilityController {
    private service;
    constructor(service: AvailabilityService);
    createRecurring(body: any, req: any): Promise<any>;
    createCustom(body: any, req: any): Promise<any>;
    get(doctorId: any, date: any): Promise<import("./availability.entity").Availability[]>;
}
