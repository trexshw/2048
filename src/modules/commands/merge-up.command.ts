import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';
import { CommandUtils } from './shared/command-utils';

export class MergeUpCommand implements ICommand {
  commandType = CommandType.UP;
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  execute(args?: string[]) {
    const originalCells = this.canvas.getCanvas();
    const newCells = originalCells.map((row) => [...row]);

    // Transpose the cells to make looping easier
    CommandUtils.transpose(newCells);
    CommandUtils.mergeCells(newCells);
    // Restore the original orientation
    CommandUtils.transpose(newCells);

    if (JSON.stringify(originalCells) !== JSON.stringify(newCells)) {
      CommandUtils.updateRandomCell(newCells);
    }

    // Update the canvas with final result
    this.canvas.setCanvas(newCells);
  }
}
