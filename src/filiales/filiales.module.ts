import { Module } from '@nestjs/common';
import { FilialesService } from './filiales.service';
import { FilialesResolver } from './filiales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filial } from './entities/filial.entity';

@Module({
  providers: [FilialesResolver, FilialesService],
  imports:[TypeOrmModule.forFeature([Filial])]
})
export class FilialesModule {}
