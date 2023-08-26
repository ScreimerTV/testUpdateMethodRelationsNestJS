import { ObjectType, Field } from '@nestjs/graphql';
import { TypesOfCharLengthsEnum } from 'src/common/enums';
import { TypesOfUserStatusEnum } from 'src/common/enums/types-of-user-status.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_status' })
@ObjectType()
export class UserStatus {
  @PrimaryGeneratedColumn('identity')
  user_status_id: number;

  @Column({ type: 'varchar', length: TypesOfCharLengthsEnum.MD })
  @Field(() => String)
  description: string;

  @OneToMany(() => User, (user) => user.user_status)
  user_status: TypesOfUserStatusEnum[];
}
