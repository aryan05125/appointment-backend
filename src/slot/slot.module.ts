import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [AvailabilityModule], // 🔥 correct
  providers: [SlotService],
  controllers: [SlotController],
})
export class SlotModule {}