// NestJS Core
import { Module } from '@nestjs/common';

//Services & Resolvers
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';

//TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { Address } from './entities/address.entity';

@Module({
  providers: [AddressesResolver, AddressesService],
  imports: [TypeOrmModule.forFeature([Address])],
})
export class AddressesModule {}
