import { Availability } from './availability.entity';
import { Repository } from 'typeorm';
export declare class AvailabilityService {
    private repo;
    constructor(repo: Repository<Availability>);
    checkConflict(doctorId: any, startTime: any, endTime: any, day?: any, date?: any): Promise<void>;
    createRecurring(data: any): Promise<any>;
    createCustom(data: any): Promise<any>;
    getAvailability(doctorId: any, date: any): Promise<Availability[]>;
}
