import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private service;
    constructor(service: DoctorService);
    onboard(body: any, req: any): Promise<any>;
    getDoctors(query: any): Promise<import("./doctor.entity").Doctor[]>;
}
