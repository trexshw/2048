import { Canvas, CanvasCell } from '../canvas';
import { NewCommand } from './new.command';

describe('NewCommand', () => {
  describe('constructor', () => {
    const command = new NewCommand(new Canvas(4, 4));
    expect(command.id).toMatch(
      /^[a-z|\d]{8}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{12}$/,
    );
  });

  describe('execute', () => {
    test('Execute new, return a new game board', () => {
      const testCases = [
        [
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
          [2, 2, 2, 2],
        ],
        [
          [16, 2, 2, 2],
          [2, 4, 2, 2],
          [2, 2, 8, 2],
          [2, 32, 2, 2],
        ],
      ];

      for (const testCase of testCases) {
        const canvas = new Canvas(4, 4);
        canvas.setCanvas(testCase);
        const command = new NewCommand(canvas);
        command.execute();

        const newCells = canvas.getCanvas();
        expect(JSON.stringify(newCells)).not.toBe(JSON.stringify(testCase));
      }
    });
  });

  describe('getStates', () => {
    test('When get states, return the stored canvas', () => {
      const canvas = new Canvas(4, 4);

      const command = new NewCommand(canvas);
      const { canvas: retrievedCanvas } = command.getStates();

      const cells = canvas.getCanvas();
      const retrievedCells = retrievedCanvas.getCanvas();
      expect(JSON.stringify(cells)).toBe(JSON.stringify(retrievedCells));
    });
  });
});
