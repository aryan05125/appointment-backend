import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repo: Repository<Availability>,
  ) {}

  // 🔥 conflict check
  async checkConflict(doctorId, startTime, endTime, day?, date?) {
    const existing = await this.repo.find({
      where: day ? { doctorId, day } : { doctorId, date },
    });

    for (let slot of existing) {
      if (
        (startTime >= slot.startTime && startTime < slot.endTime) ||
        (endTime > slot.startTime && endTime <= slot.endTime)
      ) {
        throw new BadRequestException('Time slot conflict');
      }
    }
  }

  // recurring
  async createRecurring(data) {
    await this.checkConflict(
      data.doctorId,
      data.startTime,
      data.endTime,
      data.day,
    );

    return this.repo.save({ ...data, type: 'recurring' });
  }

  // custom override
  async createCustom(data) {
    await this.checkConflict(
      data.doctorId,
      data.startTime,
      data.endTime,
      null,
      data.date,
    );

    return this.repo.save({ ...data, type: 'custom' });
  }

  // 🔥 get availability
  async getAvailability(doctorId, date) {
    // check custom first
    const custom = await this.repo.find({
      where: { doctorId, date, type: 'custom' },
    });

    if (custom.length > 0) return custom;

    // fallback recurring
    const day = new Date(date).toLocaleString('en-US', {
      weekday: 'long',
    });

    return this.repo.find({
      where: { doctorId, day, type: 'recurring' },
    });
  }
}