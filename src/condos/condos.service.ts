import { Injectable } from '@nestjs/common';
import { CreateCondoInput, UpdateCondoInput } from './dto/inputs';

@Injectable()
export class CondosService {
  create(createCondoInput: CreateCondoInput) {
    return 'This action adds a new condo';
  }

  findAll() {
    return `This action returns all condos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condo`;
  }

  update(id: number, updateCondoInput: UpdateCondoInput) {
    return `This action updates a #${id} condo`;
  }

  remove(id: number) {
    return `This action removes a #${id} condo`;
  }
}
