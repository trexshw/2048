import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';
import { CommandUtils } from './shared/command-utils';

export class MergeRightCommand implements ICommand {
  commandType = CommandType.RIGHT;
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  execute(args?: string[]) {
    const originalCells = this.canvas.getCanvas();
    const newCells = originalCells.map((row) => [...row]);

    CommandUtils.reverse(newCells);
    CommandUtils.mergeCells(newCells);
    CommandUtils.reverse(newCells);

    if (JSON.stringify(originalCells) !== JSON.stringify(newCells)) {
      CommandUtils.updateRandomCell(newCells);
    }

    this.canvas.setCanvas(newCells);
  }
}
