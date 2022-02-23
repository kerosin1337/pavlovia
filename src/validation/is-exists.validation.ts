import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface ExistsRulesInterface {
  key: string;
  table: any;
}

@ValidatorConstraint({ async: true })
export class Exists implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const { key, table } = args.constraints[0];
    try {
      if (await table.count({ where: { [key]: value } })) return true;
    } catch (e) {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} don't exist`;
  }
}

export function IsExists(
  options?: ValidationOptions,
  rules?: ExistsRulesInterface,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [rules],
      validator: Exists,
    });
  };
}
