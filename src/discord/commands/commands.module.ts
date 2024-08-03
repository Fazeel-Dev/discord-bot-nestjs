import { Module } from '@nestjs/common';
import { CommandsProvider } from './commands.provider';

@Module({
  providers: [CommandsProvider],
  exports: [CommandsProvider],
})
export class CommandsModule {}
