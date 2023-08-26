import { InputType, Field } from '@nestjs/graphql';
import { TypesOfUserStatusEnum } from 'src/common/enums/types-of-user-status.enum';
import { UserStatus } from '../entities/user-status.entity';
import { IsDefined, IsString } from 'class-validator';

@InputType()
export class CreateUserStatusInput {
  @Field(() => String, { nullable: false })
  @IsDefined()
  @IsString()
  description: string;
}
