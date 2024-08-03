import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { EventsService } from './event.service';
import { CommandModule } from './commands.module';

@Module({
  imports: [CommonModule, CommandModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
