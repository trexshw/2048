export type CanvasCell = null | number;

export default class Canvas {
  // Canvas cells. Storing the state of each cell in the board
  private cells: CanvasCell[][];

  // Canvas' width
  public width: number;

  // Canvas' height
  public height: number;

  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error('Canvas width or height cannot be 0');
    }

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
    this.width = width;
    this.height = height;
  }

  public getCanvas(): CanvasCell[][] {
    // Return immutable copy of the cells
    return this.cells.map((row) => [...row]);
  }

  public draw(): void {
    console.log(this.cells);
    console.log('\n');
  }

  public setCanvas(cells: CanvasCell[][]): void {
    if (!this.validateCanvas(cells)) {
      throw new Error('Invalid canvas');
    }
    this.cells = cells;
  }

  public validateCanvas(cells: CanvasCell[][]): boolean {
    if (cells.length !== this.height || cells[0].length !== this.width) {
      return false;
    }

    for (let i = 0; i < cells.length; i += 1) {
      for (let j = 0; j < cells[i].length; j += 1) {
        if (cells[i][j] !== null && cells[i][j] !== 2) {
          return false;
        }
      }
    }
    return true;
  }
}
