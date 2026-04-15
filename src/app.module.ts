import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AvailabilityModule } from './availability/availability.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'aryan512',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    DoctorModule,
    PatientModule,
    AvailabilityModule,
  ],
})
export class AppModule {}