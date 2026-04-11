import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
  constructor(private service: PatientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('onboard')
  onboard(@Body() body, @Req() req) {
    if (req.user.role !== 'patient') {
      throw new ForbiddenException('Only patients allowed');
    }

    return this.service.createOrUpdate({
      ...body,
      userId: req.user.id,
    });
  }
}