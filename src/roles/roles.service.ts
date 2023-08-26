//Nest Core
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//DTOs
import { CreateRoleInput, UpdateRoleInput } from './dto/inputs';

//Entities
import { Role } from './entities/role.entity';

//TypeORM
import { In, Repository } from 'typeorm';
import { ValidRoles } from 'src/common/enums';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const rol = this.rolesRepository.create(createRoleInput);
    return this.rolesRepository.save(rol);
  }

  /**
   * Search for all roles by name
   *
   * @param roles string[] - Array of roles
   *
   * @returns Promise<Role[]> - Array of roles
   */
  async findRolesByNames(roles: Role[]): Promise<Role[]> {
    const rolesFound = await this.rolesRepository.find({
      where: {
        role_name: In(roles),
      },
    });

    if (!rolesFound || rolesFound.length === 0)
      throw new BadRequestException('Invalid roles');

    return rolesFound;
  }

  /* findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  } */
}
