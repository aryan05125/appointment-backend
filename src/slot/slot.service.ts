import { Injectable } from '@nestjs/common';
import { AvailabilityService } from '../availability/availability.service';

// 🔥 Define Slot type
type Slot = {
  startTime: string;
  endTime: string;
};

@Injectable()
export class SlotService {
  constructor(private availabilityService: AvailabilityService) {}

  generateSlots(startTime: string, endTime: string, duration: number): Slot[] {
    // ✅ Type fix
    const slots: Slot[] = [];

    let start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    while (start + duration <= end) {
      const slotStart = this.minutesToTime(start);
      const slotEnd = this.minutesToTime(start + duration);

      slots.push({ startTime: slotStart, endTime: slotEnd });

      start += duration;
    }

    return slots;
  }

  async getSlots(
    doctorId: number,
    date: string,
    duration = 15,
  ): Promise<Slot[]> {
    const availability = await this.availabilityService.getAvailability(
      doctorId,
      date,
    );

    // ✅ Type fix
    let allSlots: Slot[] = [];

    for (let a of availability) {
      const slots = this.generateSlots(
        a.startTime,
        a.endTime,
        duration,
      );
      allSlots.push(...slots);
    }

    // 🔥 remove past slots
    const now = new Date();
    const selectedDate = new Date(date);

    if (selectedDate.toDateString() === now.toDateString()) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      allSlots = allSlots.filter((slot) => {
        const slotStart = this.timeToMinutes(slot.startTime);
        return slotStart > currentMinutes;
      });
    }

    return allSlots;
  }

  timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}