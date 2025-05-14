import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type wind = {
  speed: number;
  deg: number;
  gust: number;
};

@Entity()
export class Swallow_Weather {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  date: Date;

  @Column()
  temp: number;
}
