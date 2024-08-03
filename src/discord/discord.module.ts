import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DiscordService } from './discord.service';
import { CommandModule } from './commands.module';
import { EventsModule } from './event.module';

@Module({
  imports: [CommonModule, CommandModule, EventsModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
