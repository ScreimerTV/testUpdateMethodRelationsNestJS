//Class Validator
import { IsDefined, IsEmail, IsString } from 'class-validator';

/**
 * Dto que define el tipo de datos de entrada para crear un usuario en el sistema
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export class SigninDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
