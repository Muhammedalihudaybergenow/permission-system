import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsAlreadyExists } from 'src/helpers/contraints';
import { IsInputType } from 'src/helpers/types';

export function IsUnique(
  options: IsInputType,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      name: 'is-unique',
      validator: IsAlreadyExists,
      constraints: [options],
    });
  };
}
