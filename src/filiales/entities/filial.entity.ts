import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TypesOfCharLengthsEnum } from 'src/common/enums/types-of-char-lengths.enum';
import { Condo } from 'src/condos/entities/condo.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'filial' })
@ObjectType()
export class Filial {
  @PrimaryGeneratedColumn('identity', { name: 'filial_id' })
  @Field(() => Int)
  filial_id: number;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.SM,
    name: 'filial_number',
  })
  @Field(() => String)
  filial_number: string;

  @ManyToOne(() => User, (user) => user.filiales)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Condo, (condo) => condo.filiales)
  @Field(() => Condo)
  condo: Condo;
}
