import { Injectable } from '@nestjs/common';
import { QueryFilePaginationDto } from 'src/modules/files/dto';
import { ManagerFileRepository } from 'src/modules/files/repositories';
import { UserEntity } from 'src/modules/users/entities';
import * as fs from 'fs';
@Injectable()
export class ManagerFilesService {
  constructor(private managerFileRepository: ManagerFileRepository) {}
  create(files: Express.Multer.File[], user: UserEntity) {
    return this.managerFileRepository.createAndSave(files, user);
  }

  findAll(dto: QueryFilePaginationDto) {
    return this.managerFileRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.managerFileRepository.findRealtionById(id);
  }

  async remove(id: number) {
    const file = await this.managerFileRepository.findOneBy({
      id,
    });
    fs.unlinkSync(file.path);
    return this.managerFileRepository.remove(file);
  }
}
