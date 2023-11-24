import { UsePipes, applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from 'src/helpers/decorators';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export const IsPhonenumberExists = () => {
  return applyDecorators(
    ApiProperty({
      type: Number,
      required: true,
      nullable: false,
    }),
    IsNumber(),
    IsNotEmpty(),
    Min(61000000, { message: 'Phonenumber is invalid' }),
    Max(75999999, { message: 'Phonenumber is invalid' }),
    IsUnique({ column: 'phonenumber', tableName: 'users' }),
  );
};
