import { Module } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CondosResolver } from './condos.resolver';
import { Type } from 'class-transformer';
import { Condo } from './entities/condo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CondosResolver, CondosService],
  imports: [TypeOrmModule.forFeature([Condo])]
})
export class CondosModule {}
