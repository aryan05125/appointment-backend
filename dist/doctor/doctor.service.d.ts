import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
export declare class DoctorService {
    private repo;
    constructor(repo: Repository<Doctor>);
    createOrUpdate(data: any): Promise<any>;
}
