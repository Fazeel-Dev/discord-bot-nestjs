import { Module } from '@nestjs/common';
import { Collection } from 'discord.js';
import { CommandService } from './commands.service';
import { CommandInterface } from 'src/interfaces/command.interface';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: 'COMMANDS',
      useValue: new Collection<string, CommandInterface>(),
    },
    CommandService,
  ],
  exports: [CommandService],
})
export class CommandModule {}
