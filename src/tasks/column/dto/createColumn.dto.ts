import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

export class CreateColumnDTO {
  @Transform(({ value }) => value?.trim())
  @Length(8, 32)
  name: string;
}
