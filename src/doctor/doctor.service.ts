import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private repo: Repository<Doctor>,
  ) {}

  createOrUpdate(data) {
    return this.repo.save(data);
  }

  async findAll(filters) {
    const query = this.repo.createQueryBuilder('doctor');

    if (filters.name) {
      query.andWhere('LOWER(doctor.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.specialization) {
      query.andWhere(
        'LOWER(doctor.specialization) = LOWER(:specialization)',
        {
          specialization: filters.specialization,
        },
      );
    }

    return query.getMany();
  }
}