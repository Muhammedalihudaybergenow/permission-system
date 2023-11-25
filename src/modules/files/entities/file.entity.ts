import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(file?: Partial<FileEntity>) {
    Object.assign(this, file);
  }
}
