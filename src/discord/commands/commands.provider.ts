import { Injectable } from '@nestjs/common';
import { PingCommand } from './fun/ping.command';

@Injectable()
export class CommandsProvider {
    private readonly commands = [PingCommand];

    getCommands() {
        return this.commands;
    }
}
