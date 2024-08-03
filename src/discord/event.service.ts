import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { CommandService } from './commands.service';

@Injectable()
export class EventsService {
  private client: Client | null = null;
  private readonly directory = path.resolve(__dirname, 'events');

  constructor(
    private readonly logger: CustomLogger,
    private readonly commandsService: CommandService,
  ) {
    this.logger.setContext(EventsService.name);
  }

  setClient(client: Client) {
    this.client = client;
    this.loadEvents();
  }

  private async loadEvents() {
    this.logger.log(`Loading Events to the application`);
    const eventFiles = fs
      .readdirSync(this.directory)
      .filter(
        (file) =>
          file.endsWith('.js') ||
          (file.endsWith('.ts') && !file.endsWith('.d.ts')),
      );

    for (const file of eventFiles) {
      const filePath = path.join(this.directory, file);
      const eventModule = await import(filePath);

      // Iterate over all exports from the module to find the event object
      for (const key in eventModule) {
        const event = eventModule[key];
        if (event && event.name && event.execute) {
          this.logger.log(`Loading the event: ${event.name}`);
          try {
            if (event.once) {
              this.client.once(event.name, (...args) => event.execute(...args));
            } else {
              this.client.on(event.name, (...args) => event.execute(...args));
            }
          } catch (error) {
            this.logger.error(
              `Failed to load the event ${event.name} due to the error: `,
              error,
            );
          }
        }
      }
    }
  }
}
