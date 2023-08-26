//NestJS Core
import { InputType, Field } from '@nestjs/graphql';

//Class-Validator
import { IsDefined, IsString } from 'class-validator';

/**
 * Class defining the type of input data to create a role
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsDefined()
  @IsString()
  role_name: string;
}
