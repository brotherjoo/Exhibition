import { Test, TestingModule } from '@nestjs/testing';
import { SwallowService } from './swallow.service';

describe('SwallowService', () => {
  let service: SwallowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwallowService],
    }).compile();

    service = module.get<SwallowService>(SwallowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
