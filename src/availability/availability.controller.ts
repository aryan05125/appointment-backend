import {
    Controller,
    Post,
    Get,
    Body,
    Query,
    UseGuards,
    Req,
    ForbiddenException,
  } from '@nestjs/common';
  import { AvailabilityService } from './availability.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('availability')
  export class AvailabilityController {
    constructor(private service: AvailabilityService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('recurring')
    createRecurring(@Body() body, @Req() req) {
      if (req.user.role !== 'doctor') {
        throw new ForbiddenException();
      }
  
      return this.service.createRecurring({
        ...body,
        doctorId: req.user.id,
      });
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('custom')
    createCustom(@Body() body, @Req() req) {
      if (req.user.role !== 'doctor') {
        throw new ForbiddenException();
      }
  
      return this.service.createCustom({
        ...body,
        doctorId: req.user.id,
      });
    }
  
    @Get()
    get(@Query('doctorId') doctorId, @Query('date') date) {
      return this.service.getAvailability(doctorId, date);
    }
  }