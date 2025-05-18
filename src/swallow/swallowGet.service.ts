import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SwallowResponse } from './dto/swallowResponse.dto';
import { Swallow } from '../entity/swallow.entity';
import { Weather } from '../entity/weather.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SwallowService {
  constructor(
    @InjectRepository(Swallow)
    private readonly swallowRepository: Repository<Swallow>,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  async getById(id: string): Promise<SwallowResponse | null> {
    try {
      const swallow = await this.swallowRepository.findOneBy({ id: id });

      if (!swallow) {
        throw new Error('not found swallow data');
      }

      const weather = await this.weatherRepository.findOneBy({
        id: swallow.weather.id,
      });

      if (!weather) {
        throw new Error('not found weather data');
      }

      return SwallowResponse.builder()
        .setId(swallow.id)
        .setTemp(weather.temp)
        .setLat(swallow.latitude)
        .setLon(swallow.longitude)
        .setDate(swallow.date)
        .build();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getByAll(): Promise<SwallowResponse[] | null> {
    try {
      let swallowResponses!: SwallowResponse[];
      const swallows = await this.swallowRepository.find();

      if (!swallows) {
        throw new Error('noting have data');
      }

      swallows.forEach((swallow) => {
        this.weatherRepository
          .findOneBy({
            id: swallow.id,
          })
          .then((weather) => {
            if (!weather) {
              throw new Error('not find data');
            }
            swallowResponses.push(
              SwallowResponse.builder()
                .setId(swallow.id)
                .setDate(swallow.date)
                .setLat(swallow.latitude)
                .setLon(swallow.longitude)
                .setTemp(weather.temp)
                .build(),
            );
          })
          .catch((error) => {
            console.error(error);
          });
      });

      return swallowResponses;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
