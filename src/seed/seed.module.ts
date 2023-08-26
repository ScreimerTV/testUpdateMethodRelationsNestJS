import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from 'src/roles/roles.module';
import { UserStatusModule } from 'src/user_status/user-status.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, RolesModule, UserStatusModule],
})
export class SeedModule {}
