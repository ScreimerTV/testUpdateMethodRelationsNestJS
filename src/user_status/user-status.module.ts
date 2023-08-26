//NestJS Core
import { Module } from '@nestjs/common';

//TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { UserStatus } from './entities/user-status.entity';

//Services
import { UserStatusService } from './user-status.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [UserStatusService],
  imports: [TypeOrmModule.forFeature([UserStatus]), CommonModule],
  exports: [TypeOrmModule, UserStatusService],
})
export class UserStatusModule {}
