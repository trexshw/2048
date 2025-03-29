import { Canvas, CanvasCell } from '../canvas';
import { MergeRightCommand } from './merge-right.command';

describe('MergeRightCommand', () => {
  describe('execute', () => {
    test('Execute merge right, return correct cells', () => {
      const canvas = new Canvas(4, 4);

      const cases = [
        {
          before: [
            [null, 8, 2, 2],
            [4, 2, null, 2],
            [null, null, null, null],
            [null, null, null, 2],
          ],
          after: [
            [null, null, 8, 4],
            [null, null, 4, 4],
            [null, null, null, null],
            [null, null, null, 2],
          ],
        },
        {
          before: [
            [null, 8, 2, 2],
            [4, 2, 2, 2],
            [null, 2, null, 2],
            [4, 2, null, 2],
          ],
          after: [
            [null, null, 8, 4],
            [null, 4, 2, 4],
            [null, null, null, 4],
            [null, null, 4, 4],
          ],
        },
      ];

      for (const testCase of cases) {
        canvas.setCanvas(testCase.before);
        const command = new MergeRightCommand(canvas);
        command.execute();

        const afterCells = canvas.getCanvas();

        for (let i = 0; i < canvas.width; i += 1) {
          for (let j = 0; j < canvas.height; j += 1) {
            if (testCase.after[i][j] !== null) {
              expect(afterCells[i][j]).toBe(testCase.after[i][j]);
            } else {
              expect([null, 2, 4]).toContain(afterCells[i][j]);
            }
          }
        }
      }
    });

    test('When canvas is lock, skip action', () => {
      const canvas = new Canvas(4, 4);
      canvas.setLock(true);

      const command = new MergeRightCommand(canvas);
      command.execute();

      expect(JSON.stringify(canvas.getCanvas())).toBe(
        JSON.stringify(command.getStates().canvas.getCanvas()),
      );
    });
  });

  describe('getStates', () => {
    test('When get states, return the stored canvas', () => {
      const canvas = new Canvas(4, 4);

      const command = new MergeRightCommand(canvas);
      const { canvas: retrievedCanvas } = command.getStates();

      const cells = canvas.getCanvas();
      const retrievedCells = retrievedCanvas.getCanvas();
      expect(JSON.stringify(cells)).toBe(JSON.stringify(retrievedCells));
    });
  });
});
