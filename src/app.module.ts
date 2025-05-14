import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swallow_Weather } from './entity/swallow.entity';
import { SwallowController } from './swallow/swallow.controller';
import { SwallowService } from './swallow/swallow.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Swallow_Weather],
      synchronize: true,
    }),
  ],
  controllers: [AppController, SwallowController],
  providers: [AppService, SwallowService],
})
export class AppModule {}
