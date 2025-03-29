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
  });
});
