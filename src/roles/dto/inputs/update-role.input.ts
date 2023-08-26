//NestJS Core
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//DTOs
import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
  id: number;
}
