import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserStatusInput } from './dto/create-user_status.input';
import { UpdateUserStatusInput } from './dto/update-user_status.input';

import { UserStatus } from './entities/user-status.entity';

import { Repository } from 'typeorm';
import { ValidationsService } from 'src/common/services/validations-service/validations.service';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatus)
    private readonly userStatusRepository: Repository<UserStatus>,
    private readonly validationsService: ValidationsService,
  ) {}

  create(createUserStatusInput: CreateUserStatusInput): Promise<UserStatus> {
    const userStatus = this.userStatusRepository.create(createUserStatusInput);
    return this.userStatusRepository.save(userStatus);
  }

  //  findAll() {
  //   return `This action returns all userStatus`;
  // }

  async findOne(id: number): Promise<UserStatus> {
    const userStatusFound = await this.userStatusRepository.findOneBy({
      user_status_id: id,
    });

    if (!this.validationsService.isDefined(userStatusFound))
      throw new NotFoundException(`User status #${id} not found`);

    return userStatusFound;
  }

  // update(id: number, updateUserStatusInput: UpdateUserStatusInput) {
  //   return `This action updates a #${id} userStatus`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userStatus`;
  // }
}
