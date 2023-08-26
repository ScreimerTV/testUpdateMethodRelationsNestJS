//NestJS Core
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCondoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
