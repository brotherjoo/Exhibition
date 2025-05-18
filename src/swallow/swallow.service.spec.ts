import { Test, TestingModule } from '@nestjs/testing';
import { SwallowService } from './swallowGet.service';
import { Repository } from 'typeorm';
import { Swallow } from '../entity/swallow.entity';
import { Weather } from '../entity/weather.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SwallowResponse } from './dto/swallowResponse.dto';

describe('SwallowService', () => {
  let service: SwallowService;
  let mockSwallowRepo: Partial<Record<keyof Repository<Swallow>, jest.Mock>>;
  let mockWeatherRepo: Partial<Record<keyof Repository<Weather>, jest.Mock>>;

  beforeEach(async () => {
    mockSwallowRepo = {
      findOneBy: jest.fn(),
    };

    mockWeatherRepo = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwallowService,
        { provide: getRepositoryToken(Swallow), useValue: mockSwallowRepo },
        { provide: getRepositoryToken(Weather), useValue: mockWeatherRepo },
      ],
    }).compile();

    service = module.get<SwallowService>(SwallowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetByOne', () => {
    const date = new Date();

    it('should return swallow if found', async () => {
      const MockWeather = {
        id: 'dfe',
        temp: 32,
      } as Weather;

      const MockSwallow = {
        id: 'dkfjdfa',
        longitude: 123,
        latitude: 132,
        date: date,
        weather: MockWeather,
      } as Swallow;

      const MockSwallowResponse = {
        id: MockSwallow.id,
        lon: 123,
        lat: 132,
        date: date,
        temp: 32,
      } as SwallowResponse;

      mockSwallowRepo.findOneBy!.mockResolvedValue(MockSwallow);
      mockWeatherRepo.findOneBy!.mockResolvedValue(MockWeather);

      const result = await service.getById('dkfjdfa');
      expect(result).toEqual(MockSwallowResponse);
      expect(mockSwallowRepo.findOneBy).toHaveBeenCalledWith({ id: 'dkfjdfa' });
    });
  });

  describe('GetAll', () => {
    const date1 = new Date();
    const date2 = new Date();
    const date3 = new Date();

    it('should be return all swallow data', () => {});
  });
});
