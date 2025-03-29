import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';

export class QuitCommand implements ICommand {
  commandType = CommandType.QUIT;
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  execute(args?: string[]) {
    console.log('Running UpCommand');
    return;
  }
}
