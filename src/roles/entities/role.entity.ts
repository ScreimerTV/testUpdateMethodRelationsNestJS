//Nestjs Core
import { ObjectType, Field, Int } from '@nestjs/graphql';

//Enums
import { TypesOfCharLengthsEnum } from 'src/common/enums';

//TypeORM
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rol' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int)
  role_id: number;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    nullable: false,
    unique: true,
  })
  @Field(() => String)
  role_name: string;
}
