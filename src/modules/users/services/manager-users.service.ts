import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  QueryUserPaginationDto,
  UpdateUserDto,
  UserResponseDto,
} from 'src/modules/users/dto';
import { ManagerUserRepository } from 'src/modules/users/repositories';
@Injectable()
export class ManagerUsersService {
  constructor(private managerUserRepository: ManagerUserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return new UserResponseDto(
      await this.managerUserRepository.createAndSave(createUserDto),
    );
  }

  findAll(query: QueryUserPaginationDto) {
    return this.managerUserRepository.findAll(query);
  }

  findOne(id: number) {
    return this.managerUserRepository.findRelationsById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.managerUserRepository.createAndSave(updateUserDto, id);
  }
}
