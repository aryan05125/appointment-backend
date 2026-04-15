import { Controller, Get, Query } from '@nestjs/common';
import { SlotService } from './slot.service';

@Controller('slots')
export class SlotController {
  constructor(private service: SlotService) {}

  @Get()
  getSlots(
    @Query('doctorId') doctorId: number,
    @Query('date') date: string,
    @Query('duration') duration: number,
  ) {
    return this.service.getSlots(
      Number(doctorId),
      date,
      Number(duration) || 15,
    );
  }
}