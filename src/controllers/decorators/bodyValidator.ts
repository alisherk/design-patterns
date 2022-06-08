import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

type TypedDecorator = <T extends Function>(
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

export function bodyValidator(...keys: string[]): TypedDecorator {
  return function (target, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
