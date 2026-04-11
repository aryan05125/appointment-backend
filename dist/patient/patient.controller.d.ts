import { PatientService } from './patient.service';
export declare class PatientController {
    private service;
    constructor(service: PatientService);
    onboard(body: any, req: any): Promise<any>;
}
