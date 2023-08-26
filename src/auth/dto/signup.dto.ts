//Class Validator
import { IsArray, IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';

//Enums
import { ValidRoles } from 'src/common/enums';
import { Role } from 'src/roles/entities/role.entity';

/**
 * Dto que define el tipo de datos de entrada para crear un usuario en el sistema
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export class SignupDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  last_name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  phone_number: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsArray()
  //After validating that it is an array, validate that each of the elements of the array is a valid value of ValidRoles.
  //That is to say of the enum ValidRoles
  @IsEnum(ValidRoles, {
    each: true,
    message: `roles must be a valid value. Valid values are: ${Object.values(
      ValidRoles,
    )}`,
  })
  roles: Role[];
}
