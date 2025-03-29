export type CanvasCell = null | number;

export class Canvas {
  // Canvas cells. Storing the state of each cell in the board
  private cells: CanvasCell[][];

  // Canvas' width
  public width: number;

  // Canvas' height
  public height: number;

  // Lock status
  private lock: boolean;

  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error('Canvas width or height cannot be 0');
    }

    const cells = new Array(height);
    for (let i = 0; i < height; i += 1) {
      cells[i] = new Array(width).fill(null);
    }
    this.cells = cells;
    this.width = width;
    this.height = height;
    this.lock = false;

    this.reset();
  }

  // Reset game board
  public reset() {
    const width = this.width;
    const height = this.height;

    const cells = new Array(height);
    for (let i = 0; i < height; i += 1) {
      cells[i] = new Array(width).fill(null);
    }

    // Fill the cells with '2' randomly
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        cells[i][j] = Math.random() < 0.3 ? 2 : null;
      }
    }

    this.cells = cells;
  }

  // Return the canvas cells
  public getCanvas(): CanvasCell[][] {
    // Return immutable copy of the cells
    return this.cells.map((row) => [...row]);
  }

  // Print the game board
  public draw(mode: 'ARRAY' | 'CANVAS' = 'CANVAS'): void {
    if (mode === 'ARRAY') {
      console.log('---------------------\n');
      console.log('Game board:\n');
      console.log(this.cells);
      console.log('\n---------------------\n');
    } else if (mode === 'CANVAS') {
      console.log('---------------------\n');
      console.log('Game board:\n');
      for (let i = 0; i < this.height; i++) {
        let row = '';
        for (let j = 0; j < this.width; j++) {
          row += (this.cells[i][j] || '.').toString().padStart(4, ' ') + ' ';
        }
        console.log(row);
      }
      console.log('\n---------------------\n');
    }
  }

  // Update the game board with the passed cells
  public setCanvas(cells: CanvasCell[][]): void {
    if (!this.validateCanvas(cells)) {
      throw new Error('Invalid canvas');
    }
    this.cells = cells;
  }

  // Check if the game board is valid. Only null and multiple of 2 are allowed
  public validateCanvas(cells: CanvasCell[][]): boolean {
    if (cells.length !== this.height || cells[0].length !== this.width) {
      return false;
    }

    for (let i = 0; i < cells.length; i += 1) {
      for (let j = 0; j < cells[i].length; j += 1) {
        if (cells[i][j] == null) {
          continue;
        }

        const value = cells[i][j] as number;
        if (value === 0 || value % 2 !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // Update the lock status
  public setLock(lock: boolean) {
    this.lock = !!lock;
  }

  // Retrieve the lock status
  public getLock() {
    return this.lock;
  }
}
