//NestJS Core
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//DTOs
import { CreateFilialInput } from './create-filial.input';

@InputType()
export class UpdateFilialInput extends PartialType(CreateFilialInput) {
  @Field(() => Int)
  id: number;
}
