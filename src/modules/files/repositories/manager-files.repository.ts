import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from 'src/modules/files/entities';
import { ImageHelper } from 'src/helpers/common';
import { UserEntity } from 'src/modules/users/entities';
import { QueryFilePaginationDto } from 'src/modules/files/dto';
@Injectable()
export class ManagerFileRepository extends Repository<FileEntity> {
  constructor(private dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }

  async createAndSave(
    files: Express.Multer.File[],
    user: UserEntity,
  ): Promise<FileEntity[]> {
    const entities: FileEntity[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const entity = new FileEntity({
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        hash: await ImageHelper.blurhash(file.path),
        createdBy: new UserEntity({
          id: user.id,
        }),
      });
      entities.push(entity);
    }
    return this.save(entities);
  }

  async findAll(dto: QueryFilePaginationDto): Promise<[FileEntity[], number]> {
    const { limit, orderBy, orderDirection, search, skip } = dto;
    const query = this.createQueryBuilder('files');
    if (search) {
      query.andWhere('files.path LIKE :search', { search: `%${search}%` });
    }

    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .orderBy(orderBy, orderDirection)
      .getManyAndCount();
  }

  async findRealtionById(id: number): Promise<FileEntity> {
    return this.createQueryBuilder('file')
      .leftJoin('file.createdBy', 'createdBy')
      .where('file.id = :id', { id })
      .select('file.id')
      .addSelect([
        'file.path',
        'file.hash',
        'file.size',
        'file.mimetype',
        'createdBy.id',
        'createdBy.phonenumber',
      ])
      .getOne();
  }
}
