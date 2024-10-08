import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Column } from './column.entity';
import { ColumnService } from './column.service';
import { CreateColumnDTO } from './dto/createColumn.dto';
import { UpdateColumnDTO } from './dto/updateColumn.dto';
import { AuthGuard } from 'src/auth';

@Controller('users/:userId/columns')
export class ColumnController {
  public constructor(private readonly columnService: ColumnService) {}

  @Get(':columnId')
  public async getOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.columnService.getOne(userId, columnId);
  }

  @Get()
  public async getAll(@Param('userId', ParseUUIDPipe) userId: string): Promise<Column[]> {
    return this.columnService.getAll(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createColumnDTO: CreateColumnDTO,
  ): Promise<void> {
    this.columnService.create(userId, createColumnDTO);
  }

  @UseGuards(AuthGuard)
  @Patch(':columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDTO: UpdateColumnDTO,
  ): Promise<void> {
    this.update(userId, columnId, updateColumnDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<void> {
    this.columnService.delete(userId, columnId);
  }
}
