import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface UniqueRulesInterface {
  key: string;
  table: any;
}

@ValidatorConstraint({ async: true })
export class Unique implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const { key, table } = args.constraints[0];
    if (!value) {
      return true;
    }
    if (await table.findOne({ where: { [key]: value } })) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be unique`;
  }
}

export function IsUnique(
  options?: ValidationOptions,
  rules?: UniqueRulesInterface,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [rules],
      validator: Unique,
    });
  };
}
