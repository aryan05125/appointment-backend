import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userService.create({
      ...data,
      password: hashed,
    });
  }

  async login(data) {
    const user = await this.userService.findByMobile(data.mobile);

    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error('Invalid password');

    const payload = { id: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}