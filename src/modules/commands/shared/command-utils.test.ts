import { Canvas } from '../../canvas';
import { CommandUtils } from './command-utils';

describe('CommandUtils', () => {
  describe('transpose', () => {
    test('Transpose cells, return correct cells', () => {
      const width = 4;
      const height = 4;

      const beforeCells = [
        [2, 2, 2, 2],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      const expectedCells = [
        [2, null, null, null],
        [2, null, null, null],
        [2, null, null, null],
        [2, null, null, null],
      ];

      const cells = beforeCells.map((row) => [...row]);
      CommandUtils.transpose(cells);
      expect(cells).toEqual(expectedCells);

      CommandUtils.transpose(cells);
      expect(cells).toEqual(beforeCells);
    });
  });

  describe('reverse', () => {
    test('Reverse cells, return correct cells', () => {
      const beforeCells = [
        [2, null, null, null],
        [null, 2, null, null],
        [null, null, 2, null],
        [null, null, null, 2],
      ];

      const expectedCells = [
        [null, null, null, 2],
        [null, null, 2, null],
        [null, 2, null, null],
        [2, null, null, null],
      ];

      const cells = beforeCells.map((row) => [...row]);
      CommandUtils.reverse(cells);
      expect(cells).toEqual(expectedCells);
    });
  });

  describe('mergeCell', () => {
    test('Merge left, return correct cells', () => {
      const width = 4;
      const height = 4;

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
        const cells = testCase.before.map((row) => [...row]);
        CommandUtils.mergeCells(cells);

        for (let i = 0; i < width; i += 1) {
          for (let j = 0; j < height; j += 1) {
            if (testCase.after[i][j] !== null) {
              expect(cells[i][j]).toBe(testCase.after[i][j]);
            } else {
              expect([null, 2]).toContain(cells[i][j]);
            }
          }
        }
      }
    });
  });

  describe('updateRandomCell', () => {
    test('Update a random null cell with 2 or 4', () => {
      const width = 4;
      const height = 4;

      const cases = [
        {
          before: [
            [null, 8, 2, 2],
            [4, 2, null, 2],
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
        },
      ];

      for (const testCase of cases) {
        const cells = testCase.before.map((row) => [...row]);
        CommandUtils.updateRandomCell(cells);

        let updatedCount = 0;
        for (let i = 0; i < width; i += 1) {
          for (let j = 0; j < height; j += 1) {
            if (testCase.before[i][j] !== null) {
              expect(cells[i][j]).toBe(testCase.before[i][j]);
            } else {
              const cellVal = cells[i][j] as number;
              expect([null, 2, 4]).toContain(cellVal);

              if (cellVal === null) {
                continue;
              }

              if ([2, 4].includes(cellVal)) {
                updatedCount += 1;
              }
            }
          }
        }

        // only 1 null cell should be updated
        expect(updatedCount).toBe(1);
      }
    });
  });

  describe('isGameCompleted', () => {
    test('When 2046 is found, return true', () => {
      const cases = [
        [
          [2046, 8, 2, 2],
          [4, 2, null, 2],
          [null, null, null, null],
          [null, null, null, 2],
        ],
        [
          [null, 8, 2, 2],
          [4, 2, 2046, 2],
          [null, 2, null, 2],
          [4, 2, null, 2],
        ],
        [
          [null, 8, 2, 2],
          [4, 2, 2, 2],
          [null, 2, null, 2046],
          [4, 2, null, 2],
        ],
        [
          [null, 8, 2, 2],
          [4, 2, 2, 2],
          [null, 2, null, 2],
          [2046, 2, null, 2],
        ],
      ];

      for (const testCase of cases) {
        const result = CommandUtils.isGameCompleted(testCase);
        expect(result.end).toBeTruthy();
        expect(result.win).toBeTruthy();
      }
    });

    test('When there are null cell, return false', () => {
      const cases = [
        [
          [null, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
        ],
        [
          [2, 2, 2, 2],
          [2, null, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
        ],
        [
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, null, 2],
          [2, 2, 2, 2],
        ],
        [
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, null],
        ],
      ];

      for (const testCase of cases) {
        const result = CommandUtils.isGameCompleted(testCase);
        expect(result.end).toBeFalsy();
        expect(result.win).toBeFalsy();
      }
    });

    test('When no more moves, return false', () => {
      const cases = [
        [
          [2, 4, 2, 4],
          [4, 2, 4, 2],
          [2, 4, 2, 4],
          [4, 2, 4, 2],
        ],
        [
          [4, 2, 4, 2],
          [2, 4, 2, 4],
          [4, 2, 4, 2],
          [2, 4, 2, 4],
        ],
        [
          [4, 8, 16, 2],
          [2, 16, 64, 4],
          [2, 32, 2, 4],
          [4, 16, 2, 4],
        ],
      ];

      for (const testCase of cases) {
        const result = CommandUtils.isGameCompleted(testCase);
        expect(result.end).toBeTruthy();
        expect(result.win).toBeFalsy();
      }
    });
  });
});
