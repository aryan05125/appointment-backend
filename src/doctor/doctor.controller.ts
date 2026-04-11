import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private service: DoctorService) {}

  @UseGuards(JwtAuthGuard)
  @Post('onboard')
  onboard(@Body() body, @Req() req) {
    if (req.user.role !== 'doctor') {
      throw new ForbiddenException('Only doctors allowed');
    }

    return this.service.createOrUpdate({
      ...body,
      userId: req.user.id,
    });
  }
}