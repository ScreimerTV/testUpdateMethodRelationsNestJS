//Nestjs Core
import { ObjectType, Field, Int } from '@nestjs/graphql';

//Enums
import { TypesOfCharLengthsEnum } from 'src/common/enums/types-of-char-lengths.enum';

//Entities
import { Role } from 'src/roles/entities/role.entity';
import { Filial } from 'src/filiales/entities/filial.entity';
import { UserStatus } from 'src/user_status/entities/user-status.entity';

//TypeORM
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Class that defines the user entity in the database and its corresponding object type in GraphQL
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
@Entity({ name: 'user' })
@ObjectType({ description: "User's object type" })
export class User {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int)
  user_id: number;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    nullable: false,
  })
  @Field(() => String, {
    nullable: false,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    unique: true,
    nullable: false,
  })
  @Field(() => String, {
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: TypesOfCharLengthsEnum.MD,
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  phone_number: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ManyToMany(() => Role, (rol) => rol.role_id, {
    eager: true,
    nullable: false,
  })
  @JoinTable({
    name: 'user_rol',
  })
  @Field(() => [Role], {
    nullable: false,
  })
  roles: Role[];

  @OneToMany(() => Filial, (filial) => filial.user, {
    lazy: true,
  })
  @Field(() => [Filial])
  filiales: Filial[];

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.user_status, {
    eager: true,
  })
  @Field(() => UserStatus)
  user_status: UserStatus;

  /**
   * Checks the fields before inserting or updating the user
   *
   * @description
   * If the email is not in lowercase, it converts it to lowercase and removes the spaces at the beginning and end
   */
  @BeforeInsert()
  checkFieldsBeforeInsert(): void {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate(): void {
    this.checkFieldsBeforeInsert();
  }
}
