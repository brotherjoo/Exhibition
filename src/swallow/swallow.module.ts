import { Module } from '@nestjs/common';
import { SwallowController } from './swallow.controller';
import { SwallowService } from './swallowGet.service';
import { SwallowPostService } from './swallowPost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swallow } from 'src/entity/swallow.entity';
import { Weather } from 'src/entity/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Swallow, Weather])],
  exports: [TypeOrmModule],
  controllers: [SwallowController],
  providers: [SwallowService, SwallowPostService],
})
export class SwallowModule {}
