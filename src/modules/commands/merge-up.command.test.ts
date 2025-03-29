import { Canvas, CanvasCell } from '../canvas';
import { MergeUpCommand } from './merge-up.command';

describe('MergeUpCommand', () => {
  describe('execute', () => {
    test('Execute merged-up, return correct cells', () => {
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
            [4, 8, 2, 4],
            [null, 2, null, 2],
            [null, null, null, null],
            [null, null, null, null],
          ],
        },
        {
          before: [
            [null, 8, 2, 2],
            [4, 2, null, 2],
            [null, null, null, 2],
            [4, 2, null, 2],
          ],
          after: [
            [8, 8, 2, 4],
            [null, 4, null, 4],
            [null, null, null, null],
            [null, null, null, null],
          ],
        },
      ];

      for (const testCase of cases) {
        canvas.setCanvas(testCase.before);
        const command = new MergeUpCommand(canvas);
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

      const command = new MergeUpCommand(canvas);
      command.execute();

      expect(JSON.stringify(canvas.getCanvas())).toBe(
        JSON.stringify(command.getStates().canvas.getCanvas()),
      );
    });
  });

  describe('getStates', () => {
    test('When get states, return the stored canvas', () => {
      const canvas = new Canvas(4, 4);

      const command = new MergeUpCommand(canvas);
      const { canvas: retrievedCanvas } = command.getStates();

      const cells = canvas.getCanvas();
      const retrievedCells = retrievedCanvas.getCanvas();
      expect(JSON.stringify(cells)).toBe(JSON.stringify(retrievedCells));
    });
  });
});
