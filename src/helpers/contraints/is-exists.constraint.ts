import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { dataSource } from 'src/orm/configuration/data-source';

@ValidatorConstraint({
  async: true,
  name: 'is unique constraint',
})
export class IsAlreadyExists implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { tableName, column } = validationArguments.constraints[0];
    const connection = dataSource.manager.connection;
    const entity = await connection
      .createQueryBuilder()
      .select()
      .from(tableName, null)
      .where(`${column}=:value`, { value })
      .getRawOne();
    if (!entity) {
      return true;
    }
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} is already exists`;
  }
}
