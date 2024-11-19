import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './../rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { Building } from './dto/building.dto';

@Injectable()
export class BuildingsService implements OnModuleInit {
  private logger: Logger = new Logger(BuildingsService.name);

  private buildings: Building[] = [];

  constructor(
    @InjectRepository(Room) 
    private roomsRepository: Repository<Room>,
  ) {}

  public async onModuleInit() {
    this.logger.log('Start caching buildings');

    const result = await this.roomsRepository
      .createQueryBuilder('room')
      .select('building')
      .distinct(true)
      .getRawMany();

    result.forEach((row) => {
      this.buildings.push(row.building);
    });

    this.logger.log('Found buildings: ' + this.buildings.length);
  }

  public findAll(): Building[] {
    return this.buildings;
  }



}
