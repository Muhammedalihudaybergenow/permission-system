import { DateEntity } from 'src/helpers/entities';
import { LanguageEnum } from 'src/helpers/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity extends DateEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'phonenumber',
    nullable: false,
    unique: true,
  })
  phonenumber: number;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'lang',
    type: 'integer',
    nullable: false,
  })
  lang: LanguageEnum;

  constructor(entity: Partial<UserEntity>) {
    super();
    Object.assign(this, entity);
  }
}
