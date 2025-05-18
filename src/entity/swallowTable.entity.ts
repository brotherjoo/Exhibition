import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Swallow } from './swallow.entity';

@Entity()
export class SwallowTable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Swallow, (swallow) => swallow.id)
  @JoinColumn({ name: 'swallow_id' })
  swallowId: Swallow[];
}
