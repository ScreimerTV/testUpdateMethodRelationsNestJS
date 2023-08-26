import { CreateUserStatusInput } from './create-user_status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserStatusInput extends PartialType(CreateUserStatusInput) {
  @Field(() => Int)
  id: number;
}
