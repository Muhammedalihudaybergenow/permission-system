import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';
import { LanguageEnum } from 'src/helpers/enums';
import { QueryNumberString } from 'src/helpers/decorators';
export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsEnum(LanguageEnum)
  lang: LanguageEnum;

  @QueryNumberString(20)
  limit: number;

  @QueryNumberString(1)
  skip: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    type: 'enum',
    enum: ['ASC', 'DESC'],
    required: true,
    nullable: false,
  })
  @IsIn(['ASC', 'DESC'])
  @IsNotEmpty()
  orderDirection: 'ASC' | 'DESC';
}
