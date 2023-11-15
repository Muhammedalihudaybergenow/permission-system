import { DateEntity } from 'src/helpers/entities';
import { LanguageEntity } from 'src/modules/languages/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    name: 'lang_id',
    type: 'integer',
    nullable: false,
  })
  langId: number;

  @ManyToOne(() => LanguageEntity, (language) => language.id)
  @JoinColumn({
    name: 'lang_id',
    referencedColumnName: 'id',
  })
  language: LanguageEntity;

  constructor(entity: Partial<UserEntity>) {
    super();
    Object.assign(this, entity);
  }
}
