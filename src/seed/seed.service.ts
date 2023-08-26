//NestJS Core
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

//Entidades
import { Role } from 'src/roles/entities/role.entity';

//TypeORM
import { Repository } from 'typeorm';

//Data
import { SEED_ROLS, SEED_USER_STATUS } from './data/seed-data';

//Services
import { RolesService } from 'src/roles/roles.service';
import { UserStatus } from 'src/user_status/entities/user-status.entity';
import { UserStatusService } from 'src/user_status/user-status.service';

@Injectable()
export class SeedService {
  private isProduction: boolean | null | undefined;

  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserStatus)
    private readonly userStatusRepository: Repository<UserStatus>,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
    private readonly userStatusService: UserStatusService,
  ) {
    this.isProduction = this.configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProduction) {
      throw new UnauthorizedException(
        'You are not allowed to do this in production',
      );
    }

    // Limpiar la base de datos BORRANDO TODO
    await this.deleteDatabase();

    // Cargar los roles
    await this.loadRoles();

    // Cargar los estados de un usuario
    await this.loadUserStatus();

    return true;
  }

  /**
   * TODO: Documentar
   */
  private async deleteDatabase(): Promise<void> {
    //Borrar roles
    await this.rolesRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    //Borrar estados de usuario
    await this.userStatusRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  /**
   * TODO: Documentar
   */
  private async loadRoles(): Promise<void> {
    for (const rolName of SEED_ROLS) {
      await this.rolesService.create({
        role_name: rolName,
      });
    }
  }

  private async loadUserStatus(): Promise<void> {
    for (const userStatus of SEED_USER_STATUS) {
      await this.userStatusService.create({
        description: userStatus.description,
      });
    }
  }
}
