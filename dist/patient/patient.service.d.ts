import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
export declare class PatientService {
    private repo;
    constructor(repo: Repository<Patient>);
    createOrUpdate(data: any): Promise<any>;
}
