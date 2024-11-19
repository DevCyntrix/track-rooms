import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1731423600,
  })
  @Column({
    type: 'bigint',
  })
  from: number;

  @ApiProperty({
    example: 1731427200,
  })
  @Column({
    // unique: true,
    type: 'bigint',
  })
  to: number;

  @ApiProperty({
    example: 1,
  })
  @Column()
  userId: number;

  @ApiProperty({
    example: '2021-12-12T00:00:00.000Z',
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  roomKey: string;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;
}
