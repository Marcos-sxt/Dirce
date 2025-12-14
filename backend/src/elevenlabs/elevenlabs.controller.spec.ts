import { Test, TestingModule } from '@nestjs/testing';
import { ElevenlabsController } from './elevenlabs.controller';

describe('ElevenlabsController', () => {
  let controller: ElevenlabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElevenlabsController],
    }).compile();

    controller = module.get<ElevenlabsController>(ElevenlabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
