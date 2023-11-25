import { UserEntity } from 'src/modules/users/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'files',
})
export class FileEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'path',
    type: 'varchar',
    nullable: false,
  })
  path: string;

  @Column({
    name: 'hash',
    type: 'varchar',
    nullable: false,
  })
  hash: string;

  @Column({
    name: 'size',
    type: 'int',
    nullable: false,
  })
  size: number;

  @Column({
    name: 'mimetype',
    type: 'varchar',
    nullable: false,
  })
  mimetype: string;

  @ManyToOne(() => UserEntity, (createdBy) => createdBy.id)
  @JoinColumn({
    name: 'created_by_id',
    referencedColumnName: 'id',
  })
  createdBy: UserEntity;

  constructor(file?: Partial<FileEntity>) {
    Object.assign(this, file);
  }
}
