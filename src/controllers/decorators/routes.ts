import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

type TypedDecorator = <T extends Function>(
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<T extends { value: RequestHandler} ? T : any> 
) => TypedPropertyDescriptor<T> | void;


function routeBinder(method: string) {
   return function (path: string): TypedDecorator {
    return function (target, key, desc): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);

      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  }
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
