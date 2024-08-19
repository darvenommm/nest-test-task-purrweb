import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Card } from '../card/card.entity';

import type { Relation } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Card, (card: Card) => card.comments)
  card: Relation<Card>;
}
