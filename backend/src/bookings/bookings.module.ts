import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room])],
  controllers: [BookingsController],
  providers: [BookingsService, RoomsService],
})
export class BookingsModule {}
