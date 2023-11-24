import { ParseArrayPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/helpers/dtos';

export class QueryUserPaginationDto extends PaginationDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsOptional()
  @IsNumber()
  roleId: number;
}
