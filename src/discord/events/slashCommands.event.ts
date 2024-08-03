import { Events, Interaction } from 'discord.js';
import { EventInterface } from 'src/interfaces/event.interface';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { commandStore } from '../commands.store';

export const SlashCommand: EventInterface = {
  name: Events.InteractionCreate,
  once: false,
  async execute(
    interaction: Interaction,
  ) {
    const logger = new CustomLogger('SlashCommand');

    if (!interaction.isCommand() || !interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const command = commandStore.get(commandName);

    if (!command) {
      logger.warn(`No command found for ${commandName}`);
      await interaction.reply(`Unknown command: ${commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(`Error executing command ${commandName}: ${error.message}`);
      await interaction.reply(
        `There was an error executing that command: ${error.message}`,
      );
    }
  },
};
