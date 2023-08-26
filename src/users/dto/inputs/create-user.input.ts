//NestJS Core
import { InputType, Field } from '@nestjs/graphql';

//Class-Validator
import {
  IsDefined,
  IsEmail,
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsInt,
} from 'class-validator';

//Enums
import { ValidRoles } from 'src/common/enums';
import { TypesOfUserStatusEnum } from 'src/common/enums/types-of-user-status.enum';

//Entities
import { Role } from 'src/roles/entities/role.entity';

/**
 * Class defining the type of input data to create a user
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsDefined()
  @IsString()
  name: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  last_name: string;

  @Field(() => String)
  @IsDefined()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  phone_number: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  password: string;

  @Field(() => [ValidRoles])
  @IsDefined()
  @IsArray()
  roles: Role[];

  @Field(() => TypesOfUserStatusEnum, { nullable: true })
  @IsOptional()
  @IsInt()
  user_status: TypesOfUserStatusEnum;
}
