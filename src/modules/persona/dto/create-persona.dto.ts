import { IsString, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonaDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @Type(() => Date)
  @IsDate()
  fecha_nacimiento: Date;

  @IsEmail()
  correo: string;
}
