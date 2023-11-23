import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @Min(61000000, {
    message: 'Invalid phone number',
  })
  @Max(75999999, {
    message: 'Invalid phone number',
  })
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @Length(4, 50, {
    message: 'Invalid password',
  })
  password: string;
}
