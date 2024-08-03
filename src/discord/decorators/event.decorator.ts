import 'reflect-metadata';
import * as K from 'src/common/constants';

export function Event(event: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(K.EVENT_METADATA, event, descriptor.value);
  };
}