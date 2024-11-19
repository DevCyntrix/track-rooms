import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
