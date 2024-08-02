import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import configuration from '@config/configuration';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger
  ) {
    this.logger.setContext(DiscordService.name);
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    });
  }

  async onModuleInit() {
    this.client.once('ready', () => {
      this.logger.log(`Logged in as ${this.client.user.tag}!`);
    });

    this.client.on('messageCreate', (message) => {
      if (message.content === '!ping') {
        message.channel.send('Pong!');
      }
    });

    await this.client.login(this.config.discord.token);
  }
}
