import { CommandType } from '../../../types';
import { Canvas, CanvasCell } from '../../canvas';

export class CommandUtils {
  // Transpose the cells inline
  static transpose(cells: CanvasCell[][]): void {
    for (let i = 0; i < cells.length; i++) {
      for (let j = i; j < cells[i].length; j++) {
        const temp = cells[i][j];
        cells[i][j] = cells[j][i];
        cells[j][i] = temp;
      }
    }
  }

  // Reverse the cells inline
  static reverse(cells: CanvasCell[][]): void {
    cells = cells.map((row) => row.reverse());
  }

  // Merge cells inline
  static mergeCells(cells: CanvasCell[][]): void {
    const width = cells.length;
    const height = cells[0].length;

    for (let i = 0; i < width; i++) {
      const stack: {
        val: number;
        merged: boolean;
      }[] = [];

      for (let j = 0; j < height; j++) {
        const currCell = cells[i][j];

        if (currCell === null) {
          continue;
        }

        // Get last value
        const prevCell = stack.pop();

        // Empty stack
        if (!prevCell) {
          stack.push({
            val: currCell,
            merged: false,
          });
        } else {
          // Eligible to merge
          if (currCell === prevCell.val && !prevCell.merged) {
            stack.push({
              val: currCell * 2,
              merged: true,
            });
          } else {
            stack.push(prevCell);
            stack.push({
              val: currCell,
              merged: false,
            });
          }
        }
      }

      // Update merged cells
      stack.reverse();
      for (let j = 0; j < height; j++) {
        const newCell = stack.pop();
        cells[i][j] = newCell?.val || null;
      }
    }
  }

  // After each merge, update a random empty cell with 2 or 4
  static updateRandomCell(cells: CanvasCell[][]): void {
    const nullMap = new Map<string, boolean>();

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j] === null) {
          nullMap.set(`${i},${j}`, true);
        }
      }
    }

    const nullCells = Array.from(nullMap.keys()).map((key) =>
      key.split(',').map(Number),
    );
    const selectedIndex = Math.floor(Math.random() * nullCells.length);

    const nullCell = nullCells[selectedIndex];
    const [i, j] = nullCell;

    cells[i][j] = Math.random() < 0.5 ? 2 : 4;
  }

  static isGameCompleted(cells: CanvasCell[][]): {
    end: boolean;
    win: boolean;
  } {
    let isFull = true;
    let noMoreHorizontalMoves = true;
    let noMoreVerticalMoves = true;

    const testCells = cells.map((row) => [...row]);

    // horizontal check
    for (let i = 0; i < testCells.length; i++) {
      let prevVal = null;
      for (let j = 0; j < testCells[i].length; j++) {
        const currCell = testCells[i][j];
        if (currCell === 2048) {
          return {
            end: true,
            win: true,
          };
        }

        if (currCell === null) {
          isFull = false;
        }

        if (currCell === prevVal) {
          noMoreHorizontalMoves = false;
        }

        prevVal = currCell;
      }
    }

    // Vertical check
    this.transpose(testCells);
    for (let i = 0; i < testCells.length; i++) {
      let prevVal = null;
      for (let j = 0; j < testCells[0].length; j++) {
        const currCell = testCells[i][j];

        if (currCell === prevVal) {
          noMoreVerticalMoves = false;
        }

        prevVal = currCell;
      }
    }

    return {
      end: isFull && noMoreHorizontalMoves && noMoreVerticalMoves,
      win: false,
    };
  }
}
