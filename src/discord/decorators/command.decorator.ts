import 'reflect-metadata';
import * as K from 'src/common/constants';

export function Command(command: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(K.COMMAND_METADATA, command, descriptor.value);
  };
}
