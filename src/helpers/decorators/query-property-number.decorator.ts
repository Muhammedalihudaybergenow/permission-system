import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export const QueryNumberString = (value: number) => {
  return applyDecorators(
    ApiProperty({
      type: Number,
      required: true,
      nullable: false,
      default: value,
    }),
    IsNotEmpty(),
    IsInt(),
    Transform(({ value }) => parseInt(value)),
  );
};
