import { Canvas, CanvasCell } from '../canvas';
import { MergeLeftCommand } from './merge-left.command';

describe('MergeLeftCommand', () => {
  describe('execute', () => {
    test('Execute merge left, return correct cells', () => {
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
            [8, 4, null, null],
            [4, 4, null, null],
            [null, null, null, null],
            [2, null, null, null],
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
            [8, 4, null, null],
            [4, 4, 2, null],
            [4, null, null, null],
            [4, 4, null, null],
          ],
        },
      ];

      for (const testCase of cases) {
        canvas.setCanvas(testCase.before);
        const command = new MergeLeftCommand(canvas);
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
  });
});
