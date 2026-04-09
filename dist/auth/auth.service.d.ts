import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(data: any): Promise<import("../user/user.entity").User[]>;
    login(data: any): Promise<{
        access_token: string;
    }>;
}
