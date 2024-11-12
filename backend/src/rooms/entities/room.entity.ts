import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Room {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '6B040',
  })
  @PrimaryColumn()
  key: string;

  @ApiProperty({
    example: 'B',
  })
  @PrimaryColumn()
  building: string;

  @ApiProperty({
    example: '0',
  })
  @PrimaryColumn()
  floor: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
