//Nestjs Core
import { ObjectType, Field, Int } from '@nestjs/graphql';

//Enums
import { TypesOfCharLengthsEnum } from 'src/common/enums/types-of-char-lengths.enum';

//Entities
import { Filial } from 'src/filiales/entities/filial.entity';
import { Address } from 'src/addresses/entities/address.entity';

//TypeORM
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'condo' })
@ObjectType()
export class Condo {
  @PrimaryGeneratedColumn('identity', { name: 'condo_id' })
  @Field(() => Int)
  condo_id: number;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.LG,
    name: 'condo_name',
  })
  @Field(() => String)
  condo_name: string;

  @OneToMany(() => Filial, (filial) => filial.condo)
  @Field(() => [Filial])
  filiales: Filial[];

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  @Field(() => Address)
  address: Address;
}
