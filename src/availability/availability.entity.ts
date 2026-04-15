import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column()
  type: 'recurring' | 'custom';

  @Column({ nullable: true })
  day: string; // Monday, Tuesday

  @Column({ nullable: true })
  date: string; // 2026-04-20

  @Column()
  startTime: string; // "13:00"

  @Column()
  endTime: string; // "15:00";
}