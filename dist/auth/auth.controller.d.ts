import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: any): Promise<import("../user/user.entity").User[]>;
    login(body: any): Promise<{
        access_token: string;
    }>;
    doctor(req: any): string;
    patient(req: any): string;
}
