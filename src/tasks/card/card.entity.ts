import { Column as Column_, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Column } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';

import type { Relation } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column_()
  name: string;

  @ManyToOne(() => Column, (column: Column) => column.cards)
  column: Relation<Column>;

  @OneToMany(() => Comment, (comment: Comment) => comment.card)
  comments: Relation<Comment[]>;
}
