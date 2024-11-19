import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './../rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { Building } from './dto/building.dto';

@Injectable()
export class BuildingsService {

  private buildings: Building[] = [];

  constructor(@InjectRepository(Room) roomRepository: Repository<Room>,) {
    roomRepository.find({
      
    })
  }

  public async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);

    return await this.roomRepository.save(room);
  }

  public async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(key: string) {
    const room = await this.roomRepository.findOne({
      where: { key },
      relations: ['bookings'],
    });

    if (!room) {
      throw new NotFoundException('Room with id not found');
    }

    return room;
  }

  public async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);

    const mergedRoom = this.roomRepository.merge(room, updateRoomDto);

    return await this.roomRepository.save(mergedRoom);
  }

  public async remove(id: string) {
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
