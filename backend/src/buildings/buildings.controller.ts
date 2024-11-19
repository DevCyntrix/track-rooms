import {
  Controller,
  Get,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import {
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all buildings' })
  @ApiOkResponse({ description: 'Return all buildings' })
  async findAll() {
    return this.buildingsService.findAll();
  }

}
