import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import configuration from '@config/configuration';
import { ConfigType } from '@nestjs/config';
import { commandStore } from './commands.store';

@Injectable()
export class CommandService implements OnModuleInit {
  private client: Client;
  private readonly rest: REST;
  private directory = path.resolve(__dirname, 'commands'); // Update this path

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: CustomLogger,
  ) {
    this.rest = new REST({ version: '10' }).setToken(this.config.discord.token);
    this.logger.setContext(CommandService.name);
  }

  setClient(client: Client) {
    this.client = client;
  }

  onModuleInit() {
    this.loadCommands();
  }

  private async loadCommands() {
    const folders = fs.readdirSync(this.directory);
    this.logger.log('Loading Application (/) commands');
    for (const folder of folders) {
      const commandsPath = path.join(this.directory, folder);
      if (fs.statSync(commandsPath).isDirectory()) {
        const commandFiles = fs
          .readdirSync(commandsPath)
          .filter(
            (file) =>
              file.endsWith('.js') ||
              (file.endsWith('.ts') && !file.endsWith('.d.ts')),
          );

        for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          const commandModule = await import(filePath);

          for (const commandName in commandModule) {
            const command = commandModule[commandName];

            if (command && command.data && command.execute) {
              commandStore.set(command.data.name, command);
              this.logger.log(
                `Successfully loaded ${command.data.name} command`,
              );
            } else {
              this.logger.warn(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`,
              );
            }
          }
        }
      }
    }
    // Register commands with Discord
    await this.registerCommands();
  }

  private async registerCommands() {
    const commandsArray = Array.from(commandStore.values()).map((command) =>
      command.data.toJSON(),
    );

    try {
      // Register commands for a specific guild (for development/testing)
      await this.rest.put(
        Routes.applicationGuildCommands(
          this.config.discord.clientId,
          this.config.discord.guildId,
        ),
        { body: commandsArray },
      );
      this.logger.log(
        'Successfully registered application commands for guild.',
      );
    } catch (error) {
      this.logger.error('Failed to register application commands:', error);
    }
  }
}
