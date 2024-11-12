import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
import { FromToDateDto } from './dto/from-to-date.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Booking,
  })
  @ApiOperation({
    summary: 'Create a booking',
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
    type: [Booking],
  })
  @ApiOperation({
    summary: 'Retrieve all bookings',
  })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking with id not found.',
  })
  @ApiOperation({
    summary: 'Retrieve a booking by id',
  })
  findOne(@Param('id') id: number) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking with id not found.',
  })
  @ApiOperation({
    summary: 'Update a booking by id',
  })
  update(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking with id not found.',
  })
  @ApiOperation({
    summary: 'Delete a booking by id',
  })
  remove(@Param('id') id: number) {
    return this.bookingsService.remove(id);
  }

  @Post('overlapping')
  getOverlapping(@Body() { from, to }: FromToDateDto) {
    return this.bookingsService.findOverlapping(from, to);
  }
}
