//NestJS Core
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//DTOs
import { CreateCondoInput } from './create-condo.input';

@InputType()
export class UpdateCondoInput extends PartialType(CreateCondoInput) {
  @Field(() => Int)
  id: number;
}
