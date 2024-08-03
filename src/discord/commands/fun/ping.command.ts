import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { Command } from 'src/discord/decorators/command.decorator';

@Injectable()
export class PingCommand {
  @Command('ping')
  async handle(interaction: CommandInteraction) {
    console.log(interaction);
    await interaction.reply('Pong!');
  }
}
