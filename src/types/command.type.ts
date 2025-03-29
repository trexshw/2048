export enum CommandType {
  NEW = 'NEW', // New
  UP = 'UP', // Up
  DOWN = 'DOWN', // Down
  LEFT = 'LEFT', // Left
  RIGHT = 'RIGHT', // Right
  QUIT = 'QUIT', // Quit
}

export interface ICommand {
  commandType: CommandType;
  execute: (args?: string[]) => void;
}
