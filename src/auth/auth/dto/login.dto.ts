import { Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export class LoginDTO {
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @Length(6, 32)
  password: string;
}
