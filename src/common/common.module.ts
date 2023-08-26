// NestJS Core
import { Module } from '@nestjs/common';

//Services
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { ValidationsService } from './services/validations-service/validations.service';

@Module({
  providers: [BcryptService, ValidationsService],
  exports: [BcryptService, ValidationsService],
})
export class CommonModule {}
