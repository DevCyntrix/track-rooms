import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import * as rooms from './data/rooms.json';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  public async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);

    return await this.roomRepository.save(room);
  }

  public async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });

    if (!room) {
      throw new NotFoundException('Room with id not found');
    }

    return room;
  }

  public async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);

    const mergedRoom = this.roomRepository.merge(room, updateRoomDto);

    return await this.roomRepository.save(mergedRoom);
  }

  public async remove(id: number) {
    const room = await this.findOne(id);

    await this.roomRepository.remove(room);

    return room;
  }

  public async import() {
    for (const room of rooms) {
      await this.create(room);
    }
  }
}
