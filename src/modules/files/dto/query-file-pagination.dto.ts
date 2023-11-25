import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/helpers/dtos';

export class QueryFilePaginationDto extends OmitType(PaginationDto, [
  'lang' as const,
]) {
  @ApiProperty({
    type: 'enum',
    enum: ['id', 'size'],
    required: true,
    nullable: false,
    default: 'id',
  })
  @IsNotEmpty()
  @IsIn(['id', 'size'])
  orderBy: string;
}
