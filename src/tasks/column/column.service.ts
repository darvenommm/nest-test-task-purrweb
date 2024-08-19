import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ColumnHelper } from './column.helper';
import { UserHelper } from 'src/auth';
import { Column } from './column.entity';

import type { Repository } from 'typeorm';
import { CreateColumnDTO } from './dto/createColumn.dto';
import { UpdateColumnDTO } from './dto/updateColumn.dto';

@Injectable()
export class ColumnService {
  public constructor(
    private readonly userHelper: UserHelper,
    private readonly columnHelper: ColumnHelper,
    @InjectRepository(Column) private readonly columnRepository: Repository<Column>,
  ) {}

  public async getOne(userId: string, columnId: string): Promise<Column> {
    const user = await this.userHelper.getUser(userId);

    return await this.columnHelper.getColumn(user, columnId);
  }

  public async getAll(userId: string): Promise<Column[]> {
    const user = await this.userHelper.getUser(userId);

    return await this.columnRepository.findBy({ user });
  }

  public async create(userId: string, createColumnDTO: CreateColumnDTO): Promise<void> {
    const user = await this.userHelper.getUser(userId);

    this.columnRepository.insert({ ...createColumnDTO, user: user });
  }

  public async update(userId: string, columnId: string, { name }: UpdateColumnDTO): Promise<void> {
    const user = await this.userHelper.getUser(userId);
    const column = await this.columnHelper.getColumn(user, columnId);

    column.name = name ?? column.name;

    this.columnRepository.update({ id: columnId }, column);
  }

  public async delete(userId: string, columnId: string): Promise<void> {
    const user = await this.userHelper.getUser(userId);
    await this.columnHelper.getColumn(user, columnId); // check existing columns

    this.columnRepository.delete({ id: columnId });
  }
}
