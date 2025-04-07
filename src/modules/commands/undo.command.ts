import { CommandType, ICommand } from '../../types';
import { Canvas, CanvasCell } from '../canvas';
import { CommandHistory } from './shared/command-history';
import CommandManager from './shared/command-manager';
import { CommandUtils } from './shared/command-utils';
import { v4 as uuidv4 } from 'uuid';

export class UndoCommand implements ICommand {
  public id: string;
  public type: CommandType | string;

  private commandManager: CommandManager;

  private states: {
    canvas: Canvas;
  };

  constructor(canvas: Canvas, commandManager: CommandManager) {
    this.states = {
      canvas,
    };
    this.id = uuidv4();
    this.type = 'NEW';
    this.commandManager = commandManager;
  }

  execute(args?: string[]) {
    const lastCommand = this.commandManager.commandHistory.pop();
    if (!lastCommand) {
      throw new Error(`No history command founds.`);
    }

    if (!lastCommand.getStates) {
      throw new Error(`getStates() undefined.`);
    }

    // reset canvas to previous command states
    const canvas = this.states.canvas;
    const prevStates = lastCommand.getStates() as {
      originalCells: CanvasCell[][];
      canvas: Canvas;
    };
    canvas.setCanvas(prevStates.originalCells);
  }
}
