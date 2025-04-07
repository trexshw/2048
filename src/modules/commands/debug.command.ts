import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';
import CommandManager from './shared/command-manager';
import { CommandUtils } from './shared/command-utils';
import { v4 as uuidv4 } from 'uuid';

export class DebugCommand implements ICommand {
  public id: string;
  private commandManager: CommandManager;

  constructor(commandManager: CommandManager) {
    this.commandManager = commandManager;
    this.id = uuidv4();
  }

  execute(args?: string[]) {
    this.commandManager.debugQueue();
  }
}
