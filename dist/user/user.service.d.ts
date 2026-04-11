import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private repo;
    constructor(repo: Repository<User>);
    create(userData: any): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
}
