import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';

export class NewGameCommand implements ICommand {
  commandType = CommandType.NEW;
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  execute(args?: string[]) {
    console.log('Running NewGameCommand');
    return;
  }
}
