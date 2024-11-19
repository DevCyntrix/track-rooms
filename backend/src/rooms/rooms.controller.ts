import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Room,
    description: 'The room has been successfully created',
  })
  @ApiOperation({
    summary: 'Create a new room',
  })
  async create(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Room],
    description: 'The rooms have been successfully retrieved',
  })
  @ApiOperation({
    summary: 'Retrieve all rooms',
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Room,
    description: 'The room has been successfully retrieved',
  })
  @ApiNotFoundResponse({
    description: 'Room with id not found',
  })
  @ApiOperation({
    summary: 'Retrieve a room by id',
  })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Room,
    description: 'The room has been successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Room with id not found',
  })
  @ApiOperation({
    summary: 'Update a room by id',
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Room,
    description: 'The room has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Room with id not found',
  })
  @ApiOperation({
    summary: 'Deleted a room by id',
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }

  @Post('/import')
  @ApiResponse({
    status: 201,
    description: 'The rooms have been successfully imported',
  })
  @ApiOperation({
    summary: 'Initial import rooms',
  })
  async import() {
    return await this.roomsService.import();
  }


  @Post('/available')
  @ApiOkResponse({
    type: [Room],
    description: 'The available rooms have been successfully retrieved',
  })
  @ApiOperation({
    summary: 'Retrieve available rooms',
  })
  async getAvailableRooms(
    @Query('date') date: number,
    @Query('time') time: number,
    @Query('building') building: string,
    @Query('floor') floor: string,
  ) {
    return await this.roomsService.getAvailableRooms(date, time, building, floor);
  }
}
