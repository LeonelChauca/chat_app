import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  password_hash: string;

  @IsBoolean()
  @IsOptional()
  es_activo?: boolean;

  @IsNumber()
  id_persona: number;

  @IsString()
  @IsOptional()
  refresh_token?: string;
}
