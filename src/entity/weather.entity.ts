import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  temp: number;
}
