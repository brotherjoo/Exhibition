import { Test, TestingModule } from '@nestjs/testing';
import { SwallowController } from './swallow.controller';

describe('SwallowController', () => {
  let controller: SwallowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwallowController],
    }).compile();

    controller = module.get<SwallowController>(SwallowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
