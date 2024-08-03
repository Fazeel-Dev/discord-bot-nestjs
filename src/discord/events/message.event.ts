import { Message } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Event } from 'src/discord/decorators/event.decorator';

@Injectable()
export class MessageEvent {
  @Event('messageCreate')
  handle(message: Message) {
    console.log(`Message received: ${message.content}`);
  }
}
