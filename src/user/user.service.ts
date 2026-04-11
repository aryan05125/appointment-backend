import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(userData) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

   findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}