import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsQueryIntArray, QueryNumberString } from 'src/helpers/decorators';
import { PaginationDto } from 'src/helpers/dtos';
import { UserStatusEnum } from 'src/helpers/enums';

export class QueryUserPaginationDto extends PaginationDto {
  @IsQueryIntArray()
  roleIds: number[];
  @IsQueryIntArray()
  permissionIds: number[];

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  status: UserStatusEnum;

  @ApiProperty({
    type: 'enum',
    enum: ['id', 'phonenumber', 'createdBy'],
    required: true,
    nullable: false,
  })
  @IsIn(['id', 'phonenumber', 'createdBy'])
  @IsNotEmpty()
  orderBy: string;
}
