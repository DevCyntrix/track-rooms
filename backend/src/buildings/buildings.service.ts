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

    const rawResult = await this.roomsRepository
      .createQueryBuilder('room')
      .select('building, floor')
      .distinct(true)
      .getRawMany();

    const result = rawResult.reduce((acc, { building, floor }) => {
      const buildingEntry = acc.find((entry) => entry.building === building);

      if (buildingEntry) {
        buildingEntry.floors.push(floor);
      } else {
        acc.push({ building, floors: [floor] });
      }

      buildingEntry?.floors.sort((a, b) => a - b);

      return acc;
    }, []);

    this.buildings = result.map(({ building, floors }) => ({
      id: building,
      floors,
    })).sort((a, b) => a.id.localeCompare(b.id));

    this.logger.log('Found buildings: ' + this.buildings.length);
  }

  /**
   * Get all buildings
   * @returns All buildings
   */
  public findAll(): string[] {
    return this.buildings.map((x) => x.id);
  }

  /**
   * Get all floors in a building
   * @param id The id of the building
   * @returns All floors in the bulding
   */
  public findOne(id: string): string[] {
    const building = this.buildings.find((building) => building.id === id);

    if (!building) {
      throw new NotFoundException(`Building with id ${id} not found`);
    }

    return building.floors;
  }

  /**
   * Get all rooms in a building
   * @param id The id of the building
   * @returns All rooms in the building
   */
  public async getRoomsInBuilding(id: string, floor: string): Promise<Room[]> {
    return this.roomsRepository.find({
      where: {
        building: id,
        floor: floor,
      },
    });
  }
}
