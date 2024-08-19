import {
  Entity,
  PrimaryGeneratedColumn,
  Column as Column_,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from 'src/auth';
import { Card } from '../card/card.entity';

import type { Relation } from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column_()
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: Relation<User>;

  @OneToMany(() => Card, (card: Card) => card.column)
  cards: Relation<Card[]>;
}
