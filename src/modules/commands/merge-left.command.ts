import { CommandType, ICommand } from '../../types';
import { Canvas } from '../canvas';
import { CommandUtils } from './shared/command-utils';

export class MergeLeftCommand implements ICommand {
  private states: {
    canvas: Canvas;
  };

  constructor(canvas: Canvas) {
    this.states = {
      canvas,
    };
  }

  execute(args?: string[]) {
    const canvas = this.states.canvas;

    // if canvas is lock, skip action
    if (canvas.getLock()) {
      return;
    }

    const originalCells = canvas.getCanvas();
    const newCells = originalCells.map((row) => [...row]);

    CommandUtils.mergeCells(newCells);

    if (JSON.stringify(originalCells) !== JSON.stringify(newCells)) {
      CommandUtils.updateRandomCell(newCells);
    }

    canvas.setCanvas(newCells);
  }

  getStates() {
    return { ...this.states };
  }
}
