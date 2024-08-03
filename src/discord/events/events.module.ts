import { Module } from '@nestjs/common';
import { EventsProvider } from './events.provider';

@Module({
  providers: [EventsProvider],
  exports: [EventsProvider],
})
export class EventsModule { }
