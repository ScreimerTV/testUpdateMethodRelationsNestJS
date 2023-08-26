//NestJS Core
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

//NestJS TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Dtos
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';

//Entities
import { Role } from 'src/roles/entities/role.entity';
import { UserStatus } from 'src/user_status/entities/user-status.entity';
import { User } from './entities/user.entity';

//Enums
import { ValidRoles } from 'src/common/enums';
import {
  TypesOfUserStatus,
  TypesOfUserStatusEnum,
} from 'src/common/enums/types-of-user-status.enum';

//Services
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { RolesService } from 'src/roles/roles.service';
import { UserStatusService } from 'src/user_status/user-status.service';
import { ValidationsService } from 'src/common/services/validations-service/validations.service';

/**
 * Service that handles the users logic and database operations
 *
 * @author dgutierrez
 * @version 1.0
 * @since 24/08/2023
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly rolesService: RolesService,
    private readonly userStatusService: UserStatusService,
    private readonly validationsService: ValidationsService,
  ) {}

  /**
   * Creates a new user
   *
   * @param signupDto User's data
   *
   * @returns User object
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  async create(signupDto: SignupDto): Promise<User> {
    const { roles } = signupDto;

    const rolesFound: Role[] = await this.rolesService.findRolesByNames(roles);

    const userStatusFound: UserStatus = await this.userStatusService.findOne(
      TypesOfUserStatus.ACTIVE.code,
    );

    try {
      const { password, ...userData } = signupDto;

      const user = this.usersRepository.create({
        ...userData,
        password: this.bcryptService.hashSync(password),
        roles: rolesFound,
        user_status: userStatusFound,
      });

      const userSaved = await this.usersRepository.save(user);

      return userSaved;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /**
   * Finds a user by email
   *
   * @param email User's email
   *
   * @returns User object
   *
   *  @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBErrors({
        //TODO: Crear un enum con los códigos de error
        code: '002345',
        detail: `No user found with email: ${email}`,
      });
    }
  }

  /**
   * Finds a user by id
   *
   * @param id User's id
   *
   * @returns User object
   *
   *  @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  async findOneById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ user_id: id });
    } catch (error) {
      this.handleDBErrors({
        code: '002345',
        detail: `No user found with id: ${id}`,
      });
    }
  }

  /**
   * Finds all users
   *
   * @param roles Roles to filter
   * @param paginationArgs Pagination arguments for the query
   *
   * @returns Users array with pagination and filters applied if any role is passed
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  async findAll(
    roles: ValidRoles[],
    paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    const { limit, offset } = paginationArgs;

    if (roles.length === 0)
      return this.usersRepository.find({
        skip: offset,
        take: limit,
      });

    try {
      return await this.usersRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.roles', 'role') // Inner join with table roles
        .andWhere('role.role_name IN (:...roles)', { roles }) // Where role_name is in roles array
        .skip(offset)
        .take(limit)
        .getMany();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /**
   * Finds a user by id
   *
   * @param id
   * @returns
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  async findOne(id: number): Promise<User> {
    const userFound: User = await this.usersRepository.findOne({
      where: {
        user_id: id,
      },
      relations: ['roles'],
    });

    if (!userFound) throw new NotFoundException(`User with id ${id} not found`);

    return userFound;
  }

  /**
   * Updates a user
   *
   * @param id User's id
   * @param updateUserInput User's data to update
   *
   * @returns User object updated
   */
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const userFound: User = await this.findOne(id);

    const userUpdated: User = await this.updateUserFields(
      userFound,
      updateUserInput,
    );

    if (!userUpdated)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.usersRepository.save(userUpdated);
  }

  private async updateUserFields(
    existingUser: User,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { user_status, roles, password } = updateUserInput;

    let userStatusFound: UserStatus;
    let rolesToUpdate: Role[];
    let passwordToUpdate: string;

    if (this.validationsService.isDefined(user_status)) {
      userStatusFound = await this.userStatusService.findOne(user_status);
    }

    if (this.validationsService.isDefined(roles)) {
      rolesToUpdate = roles
        ? await this.rolesService.findRolesByNames(roles)
        : existingUser.roles;
    }

    if (this.validationsService.isDefined(password)) {
      passwordToUpdate = password
        ? this.bcryptService.hashSync(password)
        : existingUser.password;
    }

    return this.usersRepository.preload({
      user_id: existingUser.user_id,
      ...existingUser,
      ...updateUserInput,
      user_status: this.validationsService.isDefined(user_status)
        ? userStatusFound
        : existingUser.user_status,
      roles: this.validationsService.isDefined(roles)
        ? rolesToUpdate
        : existingUser.roles,
      password: this.validationsService.isDefined(password)
        ? passwordToUpdate
        : existingUser.password,
    });
  }

  /**
   * TODO: documentar
   *
   * @param id
   * @returns
   */
  async remove(id: number): Promise<User> {
    await this.findOne(id);

    const userStatusDeleted: UserStatus = await this.userStatusService.findOne(
      TypesOfUserStatusEnum.DELETED,
    );

    const userSoftDelete = await this.usersRepository.preload({
      user_id: id,
      user_status: userStatusDeleted,
    });

    if (!userSoftDelete)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.usersRepository.save(userSoftDelete);
  }

  /**
   * Handles the database errors
   *
   * @param error Error object with the error code and detail
   *
   * @author dgutierrez
   * @version 1.0
   * @since 24/08/2023
   */
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    if (error.code === '002345') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
