import { CommandType, ICommand } from '../../types';
import { Canvas, CanvasCell } from '../canvas';
import { CommandUtils } from './shared/command-utils';
import { v4 as uuidv4 } from 'uuid';

export class NewCommand implements ICommand {
  public id: string;
  public type: CommandType | string;

  private states: {
    originalCells: CanvasCell[][];
    canvas: Canvas;
  };

  constructor(canvas: Canvas) {
    this.states = {
      originalCells: canvas.getCanvas(),
      canvas,
    };
    this.id = uuidv4();
    this.type = 'NEW';
  }

  execute(args?: string[]) {
    const { canvas } = this.states;
    canvas.reset();
  }

  getStates() {
    return { ...this.states };
  }
}
