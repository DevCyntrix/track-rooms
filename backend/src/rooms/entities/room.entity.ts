import { ApiProperty } from '@nestjs/swagger';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Booking } from 'src/bookings/entities/booking.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableIndex,
} from 'typeorm';

@Entity('rooms')
export class Room {

  @ApiProperty({
    example: '6B040',
  })
  @PrimaryColumn()
  key: string;

  @ApiProperty({
    example: 'B',
  })
  @Index()
  @Column()
  building: string;

  @ApiProperty({
    example: '0',
  })
  @Index()
  @Column()
  floor: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
