import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @Inject(RoomsService)
    private roomsService: RoomsService,
  ) {}

  public async create(createBookingDto: CreateBookingDto) {
    const overlappings = await this.findOverlapping(
       createBookingDto.from,
      createBookingDto.to
    )

    if(overlappings.length > 0) {
      throw new Error("Booking is overlaping");
    }

    // ensure the room exists. FindOne will throw an error if the room does not exist
    await this.roomsService.findOne(createBookingDto.roomId);

    const booking = this.bookingRepository.create(createBookingDto);

    return await this.bookingRepository.save(booking);
  }

  public async findAll() {
    return await this.bookingRepository.find({
      relations: ['room'],
    });
  }

  public async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id not found`);
    }

    return booking;
  }

  public async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);

    const mergedBooking = this.bookingRepository.merge(
      booking,
      updateBookingDto,
    );

    return await this.bookingRepository.save(mergedBooking);
  }

  public async remove(id: number) {
    const booking = await this.findOne(id);

    await this.bookingRepository.remove(booking);

    return booking;
  }

  public async findOverlapping(from: number, to: number) {
    return await this.bookingRepository.createQueryBuilder('booking')
      .where('booking.from >= :from AND booking.to <= :to', { from: from, to: to })
      // .andWhere('booking.to <= :to', { to: from })
      // .
      .getMany();
      // .getSql();
  }
}
