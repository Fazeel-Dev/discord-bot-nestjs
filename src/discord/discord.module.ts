import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[CommonModule],
  providers: [DiscordService]
})
export class DiscordModule {}
