//NestJS Core
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

//Services
import { UsersService } from './users.service';

//Entities
import { User } from './entities/user.entity';

//Inputs
import { CreateUserInput, UpdateUserInput } from './dto/inputs';

//Args
import { ValidRolesArgs } from './dto/args/roles.arg';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/common/enums';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { UserStatus } from 'src/user_status/entities/user-status.entity';

/**
 * Resolver that handles the users GraphQL queries and mutations
 *
 * @author dgutierrez
 * @version 1.0
 * @since 24/08/2023
 */
@Resolver(() => User)
/* @UseGuards(JwtAuthGuard) */
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user
   *
   * @param createUserInput User's data
   *
   * @returns User object
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  @Mutation(() => User, { name: 'createUser' })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  /**
   * Finds all users
   *
   * @param user Current user
   * @param validRoles Valid roles
   * @param paginationArgs Pagination arguments (offset and limit)
   *
   * @returns Users array found in the database with the given parameters
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  @Query(() => [User], { name: 'users' })
  findAll(
    /* @CurrentUser([ValidRoles.ADMIN]) user: User, */
    @Args() validRoles: ValidRolesArgs,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles, paginationArgs);
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.remove(id);
  }
}
