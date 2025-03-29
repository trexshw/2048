import { Canvas } from './canvas';

describe('Canvas', () => {
  describe('constructor', () => {
    test('width > 0 and height > 0, success', () => {
      const canvas = new Canvas(4, 4);
      expect(canvas).not.toBeNull();
      expect(canvas).not.toBeUndefined();
      expect(canvas.width).toBe(4);
      expect(canvas.height).toBe(4);
    });

    test('height <= 0 || height <= 0, throw error', () => {
      let canvas;

      // Invalid height value = 0
      expect(() => {
        canvas = new Canvas(4, 0);
        expect(canvas).not.toBeNull();
        expect(canvas).not.toBeUndefined();
      }).toThrow(new Error('Canvas width or height cannot be 0'));

      // Invalid height value < 0
      expect(() => {
        canvas = new Canvas(4, -4);
        expect(canvas).not.toBeNull();
        expect(canvas).not.toBeUndefined();
      }).toThrow(new Error('Canvas width or height cannot be 0'));

      // Invalid width value = 0
      expect(() => {
        canvas = new Canvas(0, 4);
        expect(canvas).not.toBeNull();
        expect(canvas).not.toBeUndefined();
      }).toThrow(new Error('Canvas width or height cannot be 0'));

      // Invalid width value < 0
      expect(() => {
        canvas = new Canvas(-4, 0);
        expect(canvas).not.toBeNull();
        expect(canvas).not.toBeUndefined();
      }).toThrow(new Error('Canvas width or height cannot be 0'));

      // Invalid width and height value = 0
      expect(() => {
        canvas = new Canvas(0, 0);
        expect(canvas).not.toBeNull();
        expect(canvas).not.toBeUndefined();
      }).toThrow(new Error('Canvas width or height cannot be 0'));
    });
  });

  describe('getCanvas', () => {
    test('Get canvas, return correct cells', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();

      expect(cells).not.toBeNull();
      expect(cells).not.toBeUndefined();
      expect(cells.length).toBe(4);
      expect(cells[0].length).toBe(4);

      for (let i = 0; i < canvas.width; i += 1) {
        for (let j = 0; j < canvas.height; j += 1) {
          expect([null, 2]).toContain(cells[i][j]);
        }
      }
    });
  });

  describe('draw', () => {
    test('New canvas, print correctly with canvas mode', () => {
      const canvas = new Canvas(4, 4);
      canvas.draw();

      const cells = canvas.getCanvas();

      for (let i = 0; i < canvas.width; i += 1) {
        for (let j = 0; j < canvas.height; j += 1) {
          expect([null, 2]).toContain(cells[i][j]);
        }
      }
    });

    test('New canvas, print correctly with array mode', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();

      const consoleSpy = jest.spyOn(console, 'log');
      canvas.draw('ARRAY');
      expect(consoleSpy).toHaveBeenCalledWith(cells);
      consoleSpy.mockRestore();
    });
  });

  describe('validateCanvas', () => {
    test('Valid canvas, return true', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();
      expect(canvas.validateCanvas(cells)).toBe(true);
    });

    test('Invalid canvas, return false', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();
      cells[0][0] = 3;
      expect(canvas.validateCanvas(cells)).toBe(false);
    });

    test('invalid cell array size, return false', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();
      cells.push([null, null, null, null]);
      expect(canvas.validateCanvas(cells)).toBe(false);
    });
  });

  describe('setCanvas', () => {
    test('Valid canvas, set correctly', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();
      cells[1][1] = 2;
      canvas.setCanvas(cells);
      expect(canvas.getCanvas()).toEqual(cells);

      cells[1][1] = null;
      canvas.setCanvas(cells);
      expect(canvas.getCanvas()).toEqual(cells);
    });

    test('Invalid canvas, throw error', () => {
      const canvas = new Canvas(4, 4);
      const cells = canvas.getCanvas();
      cells[1][1] = 3;
      expect(() => {
        canvas.setCanvas(cells);
      }).toThrow(new Error('Invalid canvas'));

      cells[1][1] = 0;
      expect(() => {
        canvas.setCanvas(cells);
      }).toThrow(new Error('Invalid canvas'));
    });
  });

  describe('setLock', () => {
    test('When lock canvas, canvas is locked', () => {
      const canvas = new Canvas(4, 4);
      canvas.setLock(true);

      const lock = canvas.getLock();
      expect(lock).toBeTruthy();
    });

    test('When unlock canvas, canvas is not locked', () => {
      const canvas = new Canvas(4, 4);
      canvas.setLock(false);

      const lock = canvas.getLock();
      expect(lock).toBeFalsy();
    });
  });

  describe('getLock', () => {
    test('When get lock, lock status is returned', () => {
      const canvas = new Canvas(4, 4);
      const lock = canvas.getLock();
      expect(typeof lock).toBe('boolean');
    });
  });
});
