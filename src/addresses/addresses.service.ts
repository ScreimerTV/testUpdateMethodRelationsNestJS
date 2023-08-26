//NestJS Core
import { Injectable } from '@nestjs/common';

//InputTypes
import { CreateAddressInput, UpdateAddressInput } from './dto/inputs';

@Injectable()
export class AddressesService {
  create(createAddressInput: CreateAddressInput) {
    return 'This action adds a new address';
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressInput: UpdateAddressInput) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
