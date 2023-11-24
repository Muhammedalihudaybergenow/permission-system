import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { IsPhonenumberExists, IsUnique } from 'src/helpers/decorators';
import { LanguageEnum, UserStatusEnum } from 'src/helpers/enums';

export class CreateUserDto {
  @IsPhonenumberExists()
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  password: string;

  @ApiProperty({
    type: 'enum',
    enum: UserStatusEnum,
    required: true,
    nullable: false,
    default: UserStatusEnum.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @ApiProperty({
    type: 'enum',
    enum: LanguageEnum,
    required: true,
    nullable: false,
    default: LanguageEnum.ALL,
  })
  @IsNotEmpty()
  @IsEnum(LanguageEnum)
  lang: LanguageEnum;

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  @IsInt({
    each: true,
  })
  @IsNotEmpty()
  roleIds: number[];

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  @IsInt({
    each: true,
  })
  @IsNotEmpty()
  permissionIds: number[];
}
