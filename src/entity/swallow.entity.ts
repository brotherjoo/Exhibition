import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Weather } from './weather.entity';
import { SwallowTable } from './swallowTable.entity';

@Entity()
export class Swallow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  date: Date;

  @OneToOne(() => Weather)
  @JoinColumn({ name: 'weather_id' })
  weather: Weather;

  @ManyToOne(() => SwallowTable, (swallowTable) => swallowTable.id)
  swallowTable: SwallowTable;
}
