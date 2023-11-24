import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { LanguageEnum } from 'src/helpers/enums';
export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsEnum(LanguageEnum)
  lang: LanguageEnum;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumberString()
  skip: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
