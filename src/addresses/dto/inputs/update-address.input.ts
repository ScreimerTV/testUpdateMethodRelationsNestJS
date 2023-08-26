//NestJS Core
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//InputTypes
import { CreateAddressInput } from './create-address.input';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => Int)
  id: number;
}
