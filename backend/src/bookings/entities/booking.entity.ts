import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2021-12-12T00:00:00.000Z',
  })
  @Column({
    // unique: true,
  })
  from: Date;

  @ApiProperty({
    example: '2021-12-12T00:00:00.000Z',
  })
  @Column({
    // unique: true,
  })
  to: Date;

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

  @ApiProperty({
    example: 1,
  })
  @Column({
    // unique: true,
  })
  roomId: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;
}
