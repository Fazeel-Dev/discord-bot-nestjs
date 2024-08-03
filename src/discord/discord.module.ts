import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DiscordService } from './discord.service';
import { EventsModule } from './events/events.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [CommandsModule, EventsModule, CommonModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
