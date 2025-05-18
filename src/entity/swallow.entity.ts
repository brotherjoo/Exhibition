import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Weather } from './weather.entity';

@Entity()
export class Swallow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  date: Date;

  @OneToOne(() => Weather)
  @JoinColumn({ name: 'weather_id' })
  weather: Weather;
}
