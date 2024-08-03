import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import configuration from '@config/configuration';
import { CommandService } from './commands.service';
import { EventsService } from './event.service';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger,
    private readonly commandService: CommandService,
    private readonly eventService: EventsService,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
    this.logger.setContext(DiscordService.name);
  }

  async onModuleInit() {
    this.commandService.setClient(this.client);
    this.eventService.setClient(this.client);
    this.init();
  }

  async init() {
    this.client.on(Events.ClientReady, async () => {
      this.logger.log(`Logged in as ${this.client.user.tag}`);
    });

    await this.client.login(this.config.discord.token);
  }
}
