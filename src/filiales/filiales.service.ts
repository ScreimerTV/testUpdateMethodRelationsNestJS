// NestJS Core
import { Injectable } from '@nestjs/common';

//InputTypes
import { CreateFilialInput, UpdateFilialInput } from './dto/inputs';

@Injectable()
export class FilialesService {
  create(createFilialeInput: CreateFilialInput) {
    return 'This action adds a new filiale';
  }

  findAll() {
    return `This action returns all filiales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filiale`;
  }

  update(id: number, updateFilialeInput: UpdateFilialInput) {
    return `This action updates a #${id} filiale`;
  }

  remove(id: number) {
    return `This action removes a #${id} filiale`;
  }
}
