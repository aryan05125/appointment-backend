import { Controller, Post, Body, Get, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body) {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }

  // Doctor route
  @UseGuards(JwtAuthGuard)
  @Get('doctor')
  doctor(@Req() req) {
    if (req.user.role !== 'doctor') {
      throw new ForbiddenException();
    }
    return 'Doctor Access';
  }

  // Patient route
  @UseGuards(JwtAuthGuard)
  @Get('patient')
  patient(@Req() req) {
    if (req.user.role !== 'patient') {
      throw new ForbiddenException();
    }
    return 'Patient Access';
  }
}