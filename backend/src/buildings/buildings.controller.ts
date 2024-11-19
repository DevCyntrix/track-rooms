import { Controller, Get, Param } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all buildings' })
  @ApiOkResponse({ description: 'Return all buildings' })
  async findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a building by id' })
  @ApiOkResponse({ description: 'Return a building by id' })
  async findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Get(':id/:floor')
  @ApiOperation({ summary: 'Get all rooms for a building and floor' })
  @ApiOkResponse({ description: 'Return all rooms for a building and floor' })
  async findRooms(@Param('id') id: string, @Param('floor') floor: string) {
    return this.buildingsService.getRoomsInBuilding(id, floor);
  }
}
