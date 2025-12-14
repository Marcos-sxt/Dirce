import { Controller, Get, Query, Param, ParseFloatPipe } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('nearby')
  async findNearby(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('radius') radius?: string,
    @Query('limit') limit?: string,
  ) {
    const radiusMeters = radius ? parseInt(radius, 10) : 5000;
    const limitNum = limit ? parseInt(limit, 10) : 5;

    return this.stationsService.findNearby(lat, lng, radiusMeters, limitNum);
  }

  @Get()
  async findAll() {
    return this.stationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.stationsService.findById(id);
  }
}
