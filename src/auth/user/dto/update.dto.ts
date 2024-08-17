import { Transform } from 'class-transformer';
import { IsEmail, Length, ValidateIf } from 'class-validator';

export class UpdateDTO {
  @ValidateIf((dto: UpdateDTO) => typeof dto.email === 'string')
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email?: string;

  @ValidateIf((dto: UpdateDTO) => typeof dto.password === 'string')
  @Transform(({ value }) => value?.trim())
  @Length(6, 32)
  password?: string;
}
