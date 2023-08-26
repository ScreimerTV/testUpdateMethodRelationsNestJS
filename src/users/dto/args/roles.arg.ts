//NestJS Core
import { ArgsType, Field } from '@nestjs/graphql';

//Class-Validators
import { IsArray, IsOptional } from 'class-validator';

//Enums
import { ValidRoles } from 'src/common/enums';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [ValidRoles], { nullable: true })
  @IsOptional()
  @IsArray()
  roles: ValidRoles[] = [];
}
