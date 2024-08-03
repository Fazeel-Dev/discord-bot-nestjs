import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { CommandInterface } from 'src/interfaces/command.interface';

export const ping: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
  },
};
