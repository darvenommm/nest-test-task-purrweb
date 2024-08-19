import { Transform } from 'class-transformer';
import { Length, ValidateIf } from 'class-validator';

export class UpdateColumnDTO {
  @ValidateIf(({ value }) => typeof value === 'string')
  @Transform(({ value }) => value?.trim())
  @Length(8, 32)
  name?: string;
}
