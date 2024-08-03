import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import configuration from '@config/configuration';
import { CommandsProvider } from './commands/commands.provider';
import { EventsProvider } from './events/events.provider';
import * as K from 'src/common/constants';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly rest: REST;

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    @Inject(CommandsProvider)
    private readonly commandsProvider: CommandsProvider, // Inject commands provider class
    @Inject(EventsProvider)
    private readonly eventsProvider: EventsProvider, // Inject events provider class
    private readonly logger: CustomLogger,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.rest = new REST({ version: '10' }).setToken(this.config.discord.token);
    this.logger.setContext(DiscordService.name);
  }

  async onModuleInit() {
    this.client.on('ready', async () => {
      this.logger.log('Discord client is ready.');
      await this.registerApplicationCommands();
      this.registerCommandsAndEvents();
      this.logger.log(`Logged in as ${this.client.user.tag}`);
    });

    await this.client.login(this.config.discord.token);
  }

  private async registerApplicationCommands() {
    const commands = this.getCommandDefinitions();

    try {
      this.logger.log('Registering application commands...');
      await this.rest.put(
        Routes.applicationCommands(this.config.discord.clientId),
        { body: commands },
      );
      this.logger.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      this.logger.error('Error reloading application (/) commands:', error);
    }
  }

  private getCommandDefinitions() {
    const commands = [];
    // Collect command definitions from injected command classes
    const commandInstances = this.commandsProvider.getCommands().map(Command => new Command());
    commandInstances.forEach((instance) => {
      const prototype = Object.getPrototypeOf(instance);
      const methodNames = Object.getOwnPropertyNames(prototype);

      methodNames.forEach((methodName) => {
        const commandName = Reflect.getMetadata(
          K.COMMAND_METADATA,
          instance[methodName],
        );
        if (commandName) {
          commands.push({
            name: commandName,
            description: `${commandName} command`,
            options: [], // You can add options here if needed
          });
        }
      });
    });
    return commands;
  }

  private registerCommandsAndEvents() {
    const eventInstances = this.eventsProvider.getEvents().map(Event => new Event());
    eventInstances.forEach((instance) => {
      const prototype = Object.getPrototypeOf(instance);
      const methodNames = Object.getOwnPropertyNames(prototype);

      methodNames.forEach((methodName) => {
        const eventName = Reflect.getMetadata(
          K.EVENT_METADATA,
          instance[methodName],
        );
        if (eventName) {
          this.client.on(eventName, instance[methodName].bind(instance));
          this.logger.log(`Registered event: ${eventName}`);
        }
      });
    });
  }
}
