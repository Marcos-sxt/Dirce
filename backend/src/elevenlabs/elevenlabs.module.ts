import { Module } from '@nestjs/common';
import { ElevenlabsService } from './elevenlabs.service';
import { ElevenlabsController } from './elevenlabs.controller';

@Module({
  providers: [ElevenlabsService],
  exports: [ElevenlabsService],
  controllers: [ElevenlabsController],
})
export class ElevenlabsModule {}
