//NestJS Core
import { ObjectType, Field, Int } from '@nestjs/graphql';

//Enums
import { TypesOfCharLengthsEnum } from 'src/common/enums/types-of-char-lengths.enum';

//TypeORM
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'address' })
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn('identity', { name: 'address_id' })
  @Field(() => Int)
  address_id: number;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.XL,
    name: 'street_address',
  })
  @Field(() => String)
  street_address: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    name: 'country',
  })
  @Field(() => String)
  country: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    name: 'province',
  })
  @Field(() => String)
  province: string;

  @Column({ type: 'varchar', length: TypesOfCharLengthsEnum.MD, name: 'city' })
  @Field(() => String)
  city: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    name: 'district',
  })
  @Field(() => String)
  district: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.SM,
    name: 'postal_code',
  })
  @Field(() => String)
  postal_code: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: TypesOfCharLengthsEnum.XS,
    name: 'lat',
  })
  @Field(() => String, { nullable: true })
  lat: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: TypesOfCharLengthsEnum.XS,
    name: 'lng',
  })
  @Field(() => String, { nullable: true })
  lng: string;
}
