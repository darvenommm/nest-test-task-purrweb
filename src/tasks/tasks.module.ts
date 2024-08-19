import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth';
import { Column } from './column/column.entity';
import { Card } from './card/card.entity';
import { Comment } from './comment/comment.entity';

import { ColumnController } from './column/column.controller';
import { ColumnService } from './column/column.service';
import { ColumnHelper } from './column/column.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Column, Card, Comment]), AuthModule],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnHelper],
})
export class TasksModule {}
