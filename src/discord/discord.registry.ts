export interface CommandMetadata {
  command: string;
  handler: (args: any) => void;
}

export interface EventMetadata {
  event: string;
  handler: (args: any) => void;
}

export class DiscordRegistry {
  private static commands: CommandMetadata[] = [];
  private static events: EventMetadata[] = [];

  static registerCommand(metadata: CommandMetadata) {
    this.commands.push(metadata);
  }

  static registerEvent(metadata: EventMetadata) {
    this.events.push(metadata);
  }

  static getCommands(): CommandMetadata[] {
    return this.commands;
  }

  static getEvents(): EventMetadata[] {
    return this.events;
  }
}
