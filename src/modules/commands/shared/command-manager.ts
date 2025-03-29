import { ICommand } from '../../../types';

export default class CommandManager {
  public commandHistory: ICommand[];
  public commandQueue: ICommand[];

  constructor() {
    this.commandHistory = [];
    this.commandQueue = [];
  }

  public addCommand(command: ICommand): void {
    this.commandQueue.push(command);
  }

  public runCommand(): void {
    const command = this.commandQueue.shift();

    if (command) {
      command.execute();
      this.commandHistory.push(command);
    } else {
      throw new Error('Invalid command or no commands are found.');
    }
  }
}
