import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Column } from './column.entity';

import type { Repository } from 'typeorm';
import type { User } from 'src/auth';

@Injectable()
export class ColumnHelper {
  public constructor(
    @InjectRepository(Column) private readonly columnRepository: Repository<Column>,
  ) {}

  public async getColumn(user: User, columnId: string): Promise<Column> {
    const column = await this.columnRepository.findOneBy({ id: columnId, user });

    if (!column) throw new ConflictException('Not found column by this column id from given user');

    return column;
  }
}
