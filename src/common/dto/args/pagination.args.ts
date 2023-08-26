import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsInt, Min } from 'class-validator';

/**
 * Class that defines the pagination arguments for GraphQL
 */
@ArgsType()
export class PaginationArgs {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(0)
  @IsInt()
  offset = 0;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  limit = 10;
}
