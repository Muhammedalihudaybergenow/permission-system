import { Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export class DateEntity {
  @Column({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
  })
  createdAt: number;

  @Column({
    name: 'updated_at',
    type: 'bigint',
    nullable: false,
  })
  updatedAt: number;

  @BeforeInsert()
  protected createDates() {
    const date = new Date().getTime();
    this.createdAt = date;
    this.updatedAt = date;
  }

  @BeforeUpdate()
  protected updateDates() {
    const date = new Date().getTime();
    this.updatedAt = date;
  }
}
