import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CommonModule } from 'src/common/common.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserStatusModule } from 'src/user_status/user-status.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    RolesModule,
    UserStatusModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
