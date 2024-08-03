import { Injectable } from '@nestjs/common';
import { MessageEvent } from './message.event';

@Injectable()
export class EventsProvider {
    private readonly events = [MessageEvent];

    getEvents() {
        return this.events;
    }
}
