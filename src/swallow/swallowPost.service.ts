import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swallow } from 'src/entity/swallow.entity';
import { Weather } from 'src/entity/weather.entity';
import { Repository } from 'typeorm';
import { SwallowReq } from './dto/swallowReq.dto';

@Injectable()
export class SwallowPostService {
  constructor(
    @InjectRepository(Swallow)
    private readonly swallowRepository: Repository<Swallow>,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  public PostSwallow(swallowReq: SwallowReq[]): boolean {
    return true;
  }
}
