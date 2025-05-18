import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swallow } from './entity/swallow.entity';
import { ConfigModule } from '@nestjs/config';
import { SwallowModule } from './swallow/swallow.module';
import { DataSource } from 'typeorm';
import { Weather } from './entity/weather.entity';
import { SwallowTable } from './entity/swallowTable.entity';

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
      entities: [Swallow, Weather, SwallowTable],
      synchronize: true,
    }),
    SwallowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
